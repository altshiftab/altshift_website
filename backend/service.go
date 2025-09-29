package main

import (
	"context"
	"fmt"
	"log/slog"

	motmedelEnv "github.com/Motmedel/utils_go/pkg/env"
	motmedelErrors "github.com/Motmedel/utils_go/pkg/errors"
	altshiftGcpUtilsHttp "github.com/altshiftab/gcp_utils/pkg/http"
	altshiftGcpUtilsLog "github.com/altshiftab/gcp_utils/pkg/log"
)

func main() {
	logger := altshiftGcpUtilsLog.DefaultFatal(context.Background())
	slog.SetDefault(logger.Logger)

	httpServer, _, err := altshiftGcpUtilsHttp.MakePublicHttpService(
		"www.altshift.se",
		motmedelEnv.GetEnvWithDefault("PORT", "8080"),
		staticContentEndpointSpecifications,
		[2]string{"altshift.se", "https://www.altshift.se/"},
	)
	if err != nil {
		logger.FatalWithExitingMessage("An error occurred when making the mux.", fmt.Errorf("make mux: %w", err))
	}

	if err := httpServer.ListenAndServe(); err != nil {
		logger.FatalWithExitingMessage(
			"An error occurred when listening and serving.",
			motmedelErrors.NewWithTrace(fmt.Errorf("http server listen and serve: %w", err), httpServer),
		)
	}
}
