# Security

## 1. Authentication & Authorization
- **Authentication Framework**: We will use Auth.js (formerly NextAuth.js) for robust, secure authentication handling (OAuth, Magic Links, or secure password hashing).
- **Authorization / RBAC**: Workspace-level roles (e.g., Admin, Member, Viewer). Every API request must verify both the user's identity and their role within the specific `workspace_id`.

## 2. Tenant Isolation
- **Row-Level Security (RLS)**: As we use PostgreSQL, we will implement RLS policies to ensure that database queries automatically restrict access to data belonging to the authenticated user's workspace.
- **Application Level Check**: The ORM (Drizzle) queries must explicitly include `where(eq(table.workspaceId, currentWorkspaceId))` as a secondary defense.

## 3. Data Protection
- **In Transit**: All traffic must be enforced over HTTPS (TLS 1.2+).
- **At Rest**: Leverage managed database provider's encryption at rest (e.g., AWS RDS KMS, Supabase, Neon).
- **Secrets Management**: No secrets (API keys, DB credentials) in source code. Use environment variables injected at deployment time (e.g., Vercel Environment Variables).

## 4. AI Provider Security
- **API Keys**: LLM provider API keys (e.g., Gemini) must never be exposed to the client. All AI generation must happen server-side or via background workers.
- **Prompt Injection**: Implement sanitization and strict validation of user inputs before passing them to the LLM to mitigate prompt injection attacks.
- **Data Sharing**: Ensure LLM providers are configured with zero-data-retention policies for API usage (they must not train on our customer's proprietary business data).

## 5. Vulnerability Mitigation
- **XSS & CSRF**: Next.js and React inherently protect against most XSS. Auth.js provides built-in CSRF protection for API routes.
- **Input Validation**: Use **Zod** to strictly parse and validate all incoming request bodies and query parameters. Unvalidated data must never reach the database or the LLM.
