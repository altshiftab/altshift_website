package main

import (
	"context"
	"fmt"
	"log/slog"
	"maps"
	"net/http"

	motmedelEnv "github.com/Motmedel/utils_go/pkg/env"
	motmedelErrors "github.com/Motmedel/utils_go/pkg/errors"
	altshiftGcpUtilsHttp "github.com/altshiftab/gcp_utils/pkg/http"
	altshiftGcpUtilsLog "github.com/altshiftab/gcp_utils/pkg/log"
)

func main() {
	logger := altshiftGcpUtilsLog.DefaultFatal(context.Background())
	slog.SetDefault(logger.Logger)

	httpServer, mux, err := altshiftGcpUtilsHttp.MakePublicHttpService(
		"www.altshift.se",
		motmedelEnv.GetEnvWithDefault("PORT", "8080"),
		staticContentEndpointSpecifications,
		[2]string{"altshift.se", "https://www.altshift.se/"},
	)
	if err != nil {
		logger.FatalWithExitingMessage("An error occurred when making the mux.", fmt.Errorf("make mux: %w", err))
	}

	if err := altshiftGcpUtilsHttp.PatchTrustedTypes(mux, litHtmlTrustedTypesPolicy, webpackTrustedTypesPolicy); err != nil {
		logger.FatalWithExitingMessage(
			"An error occurred when patching trusted types.",
			motmedelErrors.NewWithTrace(
				fmt.Errorf("patch trusted types: %w", err),
				mux, litHtmlTrustedTypesPolicy, webpackTrustedTypesPolicy,
			),
		)
	}

	indexEndpointSpecification := mux.Get("/", http.MethodGet)
	if indexEndpointSpecification == nil {
		logger.FatalWithExitingMessage(
			"The index endpoint specification is nil.",
			nil,
		)
	}

	for route := range maps.Values(routes) {
		specification := *indexEndpointSpecification
		specification.Path = route

		mux.Add(&specification)
	}

	if err := httpServer.ListenAndServe(); err != nil {
		logger.FatalWithExitingMessage(
			"An error occurred when listening and serving.",
			motmedelErrors.NewWithTrace(fmt.Errorf("http server listen and serve: %w", err), httpServer),
		)
	}
}
