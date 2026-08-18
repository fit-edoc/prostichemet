# Non-Functional Requirements

## 1. Performance
- **API Latency**: Core CRUD operations must respond in under 200ms.
- **AI Operations**: AI operations (LLM calls) are expected to take several seconds. These must be handled asynchronously via background workers (Redis/BullMQ) and not block the main request thread. Webhooks or polling endpoints should be provided for client updates.
- **Search Latency**: Vector search operations (pgvector) must execute in under 500ms to ensure a snappy user experience during lead filtering.

## 2. Scalability
- **Compute**: The API layer (Next.js route handlers) must be stateless and horizontally scalable.
- **Database**: PostgreSQL must handle concurrent connections efficiently; connection pooling (e.g., PgBouncer) should be utilized.
- **Workers**: Background workers must be horizontally scalable based on the queue depth to handle bursts in research or email campaigns.

## 3. Availability and Reliability
- **Uptime**: Target 99.9% uptime for the API and frontend.
- **Graceful Degradation**: If an AI provider (e.g., Gemini) is down, the system should degrade gracefully (e.g., pause campaigns, queue research tasks, show user-friendly error states).
- **Retry Mechanisms**: Implement exponential backoff for all third-party API integrations (LLM, Enrichment APIs, Email providers).

## 4. Multi-Tenancy and Data Isolation
- **Tenant Isolation**: Every database table containing tenant data must include a `workspace_id`.
- **Row-Level Security (RLS)**: Must be enforced at the database level to ensure no tenant can access another tenant's data, even in the event of an application logic flaw.

## 5. Security and Privacy
- **Data Protection**: PII (Personally Identifiable Information) such as contact emails and names must be encrypted in transit (TLS) and at rest.
- **Authentication**: Strict authentication (Auth.js) and Role-Based Access Control (RBAC) within workspaces (e.g., Owner, Member).

## 6. Observability
- **Tracing**: All AI decisions must be logged with inputs, outputs, and tokens used.
- **Error Tracking**: Centralized error tracking (e.g., Sentry) must be integrated into both the frontend and backend.
