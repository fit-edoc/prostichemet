# REST API Reference

### Authentication
- `POST /api/v1/auth/google`: Exchange Google idToken or verified OAuth session for workspace JWT.
- `GET /api/v1/auth/me`: Retrieve authenticated user context and active workspace membership.

### Profiles & Workspaces
- `GET /api/v1/workspaces`: List member workspaces.
- `POST /api/v1/workspaces`: Create a new workspace.
- `GET /api/v1/profiles`: Fetch business profiles for active workspace.
- `POST /api/v1/profiles`: Create business profile.

### RAG & Ingestion
- `POST /api/v1/rag/scrape-and-ingest`: Crawl target domain and extract knowledge chunks.
- `POST /api/v1/rag/scrape-preview`: Fetch website title and headings without storing.
- `POST /api/v1/rag/query`: Search knowledge base via semantic text query.

### ICP & Leads
- `POST /api/v1/icps/generate`: Generate Ideal Customer Profile from business profile.
- `GET /api/v1/crm/leads`: Retrieve prospect pipeline with status filters.
- `PATCH /api/v1/crm/leads/:id/status`: Update lead progression stage.
