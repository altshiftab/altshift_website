package main

import (
	"context"
	"fmt"
	motmedelEnv "github.com/Motmedel/utils_go/pkg/env"
	motmedelErrors "github.com/Motmedel/utils_go/pkg/errors"
	motmedelMux "github.com/Motmedel/utils_go/pkg/http/mux"
	"github.com/Motmedel/utils_go/pkg/http/mux/types/response_error"
	"github.com/Motmedel/utils_go/pkg/http/problem_detail"
	motmedelHttpTypes "github.com/Motmedel/utils_go/pkg/http/types"
	altshiftGcpUtilsHttp "github.com/altshiftab/gcp_utils/pkg/http"
	altshiftGcpUtilsLog "github.com/altshiftab/gcp_utils/pkg/log"
	"golang.org/x/net/http2"
	"golang.org/x/net/http2/h2c"
	"log/slog"
	"net/http"
	"net/url"
	"time"
)

func makeMux() (*motmedelMux.Mux, error) {
	baseUrlString := "https://www.altshift.se"
	baseUrl, err := url.Parse(baseUrlString)
	if err != nil {
		return nil, motmedelErrors.NewWithTrace(fmt.Errorf("url parse: %w", err), baseUrlString)
	}

	mux := altshiftGcpUtilsHttp.MakeMux(staticContentEndpointSpecifications, nil)

	documentEndpointSpecifications := mux.GetDocumentEndpointSpecifications()

	if err := altshiftGcpUtilsHttp.PatchCrawlable(mux, baseUrl, documentEndpointSpecifications); err != nil {
		return nil, motmedelErrors.New(
			fmt.Errorf("patch crawlable: %w", err),
			mux, baseUrl, documentEndpointSpecifications,
		)
	}

	if err := altshiftGcpUtilsHttp.PatchErrorReporting(mux, baseUrl); err != nil {
		return nil, motmedelErrors.New(fmt.Errorf("patch error reporting: %w", err), mux, baseUrl)
	}

	if err := altshiftGcpUtilsHttp.PatchStrictTransportSecurity(mux); err != nil {
		return nil, motmedelErrors.New(fmt.Errorf("patch strict transport security: %w", err), mux)
	}

	altshiftGcpUtilsHttp.PatchSecurityTxt(
		mux,
		[]byte(
			fmt.Sprintf(
				"Contact: mailto:security@altshift.se\nPreferred-Languages: sv, en\nCanonical: https://www.altshift.se/.well-known/security.txt\nExpires: %s\n",
				time.Now().UTC().AddDate(1, 0, 0).Format("2006-01-02T15:04:05.000Z"),
			),
		),
	)

	return mux, nil
}

func main() {
	logger := altshiftGcpUtilsLog.DefaultFatal(context.Background())
	slog.SetDefault(logger.Logger)

	port := motmedelEnv.GetEnvWithDefault("PORT", "8080")

	mux, err := makeMux()
	if err != nil {
		logger.FatalWithExitingMessage("An error occurred when making the mux.", fmt.Errorf("make mux: %w", err))
	}

	mux.ProblemDetailConverter = response_error.ProblemDetailConverterFunction(
		func(detail *problem_detail.ProblemDetail, negotiation *motmedelHttpTypes.ContentNegotiation) ([]byte, string, error) {
			data, contentType, err := response_error.ConvertProblemDetail(detail, negotiation)
			if err != nil {
				return nil, "", fmt.Errorf("convert problem detail: %w", err)
			}
			if contentType == "application/problem+xml" {
				contentType = "application/xml"
			}
			return data, contentType, nil
		},
	)

	vhostMux := &motmedelMux.VhostMux{
		HostToSpecification: map[string]*motmedelMux.VhostMuxSpecification{
			"www.altshift.se": {Mux: mux},
			"altshift.se":     {RedirectTo: "https://www.altshift.se"},
		},
	}
	vhostMux.DefaultHeaders = mux.DefaultHeaders

	httpServer := &http.Server{Addr: fmt.Sprintf(":%s", port), Handler: h2c.NewHandler(vhostMux, &http2.Server{})}
	if err := httpServer.ListenAndServe(); err != nil {
		logger.FatalWithExitingMessage(
			"An error occurred when listening and serving.",
			motmedelErrors.NewWithTrace(fmt.Errorf("http server listen and serve: %w", err), httpServer),
		)
	}
}
