Don't store prompts inside random TypeScript files.

Use:

prompts/

And version them.

Example:

company-research.v1.md
company-research.v2.md
company-research.v3.md

Store metadata:

prompt_name
version
model
temperature
created_at

And record every AI run:

ai_runs


id
workspace_id
task
prompt_version
model
input_tokens
output_tokens
latency
status
error

This is essential for production debugging.