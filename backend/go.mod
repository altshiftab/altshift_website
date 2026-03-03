module github.com/altshiftab/altshift_website

go 1.26

require (
	github.com/Motmedel/utils_go v0.0.396
	github.com/Motmedel/utils_go/pkg/http/mux v0.0.180
	github.com/altshiftab/gcp_utils v0.0.15
	github.com/altshiftab/gcp_utils/pkg/http v0.0.47
)

require (
	github.com/Motmedel/parsing_utils v0.0.5 // indirect
	github.com/Motmedel/utils_go/pkg/http/parsing/headers v0.0.36 // indirect
	github.com/altshiftab/mux_static_content/cmd/generate_endpoints v0.0.12 // indirect
	github.com/gammazero/deque v1.2.1 // indirect
	github.com/hashicorp/go-uuid v1.0.3 // indirect
	github.com/pandatix/go-abnf v0.4.1 // indirect
	github.com/vphpersson/code_generation v0.0.9 // indirect
	github.com/vphpersson/code_generation/cmd/translate_json_object v0.0.3 // indirect
	golang.org/x/net v0.51.0 // indirect
	golang.org/x/sync v0.19.0 // indirect
	golang.org/x/text v0.34.0 // indirect
)

tool (
	github.com/altshiftab/mux_static_content/cmd/generate_endpoints
	github.com/vphpersson/code_generation/cmd/translate_json_object
)
