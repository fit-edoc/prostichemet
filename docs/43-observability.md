# Observability

## 1. Application Monitoring
- **Sentry**: Integrated for frontend error tracking and backend exception capturing. All unhandled promises and API errors must report to Sentry.

## 2. Tracing & APM
- Use OpenTelemetry or a managed APM (like Datadog/New Relic) to trace requests across the API, database, and background workers.
- Crucial trace points:
  - LLM response latency.
  - Vector search (pgvector) query duration.
  - Database connection acquisition times.

## 3. Logging
- Use a structured JSON logger (e.g., Pino).
- Do not log sensitive user data (PII like emails or API keys).
- Logs should include context: workspaceId, userId, 	raceId.

## 4. AI Specific Observability
- Log every prompt sent to the LLM and the exact response received.
- Track token usage (prompt and completion tokens) per request to calculate per-workspace cost metrics.
- Record the model version used for each request.
