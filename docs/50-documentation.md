# Documentation Strategy

## 1. Internal Developer Docs
- Live in the docs/ folder (where this file resides).
- Includes architecture, API specifications, and prompt designs.
- Must be kept up to date with major system changes.

## 2. API Documentation
- For internal use (or external if we open the API later).
- Auto-generated from Zod schemas or using Swagger/OpenAPI.
- Accessible via /api-docs in development mode.

## 3. User Documentation (Help Center)
- Managed separately via a documentation platform (e.g., GitBook, Docusaurus, or Mintlify).
- Focuses on product workflows: "How to define your ICP", "How to connect your inbox".
