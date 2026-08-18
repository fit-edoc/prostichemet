# Security Coding Rules

**Context**: For generating security-related backend code.

- **Auth.js**: Use getServerSession() to verify requests.
- **Sanitization**: Never log raw LLM API keys. Validate everything via Zod.
