module github.com/altshiftab/altshift_website

go 1.26

require (
	github.com/Motmedel/utils_go v0.0.466
	github.com/Motmedel/utils_go/pkg/http/mux v0.0.185
	github.com/altshiftab/gcp_utils v0.0.22
	github.com/altshiftab/gcp_utils/pkg/http v0.0.64
)

require (
	github.com/Motmedel/parsing_utils v0.0.6 // indirect
	github.com/Motmedel/utils_go/pkg/http/mux/types/body_parser/json_schema_body_parser v0.0.21 // indirect
	github.com/Motmedel/utils_go/pkg/http/parsing/headers v0.0.41 // indirect
	github.com/altshiftab/jsonschema v0.0.15 // indirect
	github.com/altshiftab/mux_static_content/cmd/generate_endpoints v0.0.12 // indirect
	github.com/hashicorp/go-uuid v1.0.3 // indirect
	github.com/pandatix/go-abnf v0.4.2 // indirect
	github.com/vphpersson/code_generation v0.0.9 // indirect
	github.com/vphpersson/code_generation/cmd/translate_json_object v0.0.3 // indirect
	github.com/vphpersson/type_generation v0.0.26 // indirect
	golang.org/x/net v0.53.0 // indirect
	golang.org/x/sync v0.20.0 // indirect
	golang.org/x/text v0.36.0 // indirect
)

tool (
	github.com/altshiftab/mux_static_content/cmd/generate_endpoints
	github.com/vphpersson/code_generation/cmd/translate_json_object
)
