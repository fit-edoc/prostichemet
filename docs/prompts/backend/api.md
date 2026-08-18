# Backend API Coding Rules

**Context**: For AI Code Assistants (e.g., Cursor) generating Next.js backend code.

- **Framework**: Next.js App Router (Route Handlers).
- **Structure**: API routes must only handle HTTP parsing, authentication checks, and input validation (Zod). Pass the validated data to the Service Layer (src/services).
- **Response Format**: Use the standard JSON structure defined in 14-api-design.md.
