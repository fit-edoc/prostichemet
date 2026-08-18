# Backend Development

## Architecture Principles
- **Next.js Route Handlers**: Used for the primary API layer.
- **Service Layer Pattern**: Keep route handlers thin. All business logic, DB queries, and AI orchestrations should live in src/services/ (e.g., WorkspaceService, ResearchService).
- **Data Validation**: Every incoming request must be parsed via Zod schemas before processing.

## Database & ORM (Drizzle)
- Use Drizzle ORM for type-safe database interactions.
- Migrations should be handled via Drizzle Kit.
- Always include workspaceId in queries to enforce tenant isolation.
- Example:
  `	ypescript
  export async function getLeads(workspaceId: string) {
    return await db.select().from(leads).where(eq(leads.workspaceId, workspaceId));
  }
  `

## AI Orchestration
- Direct LLM calls should be encapsulated in src/services/ai/.
- Use structured outputs (JSON schema) for all LLM responses to ensure parsability.
- Handle Gemini rate limits and timeouts gracefully.

## Background Jobs
- Heavy backend processes (researching 100 companies, sending 500 emails) must NEVER run in the Next.js request lifecycle.
- Delegate to Redis-backed queues (BullMQ) or serverless background workers.
