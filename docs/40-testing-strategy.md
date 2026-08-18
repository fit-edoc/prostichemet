# Testing Strategy

## Overview
Quality is critical since we are automating outward-facing communications (emails) on behalf of our users.

## 1. Unit Testing
- **Framework**: Vitest (fast, compatible with Vite/Next).
- **Scope**: All business logic in src/services/, utility functions, and prompt builders must have 100% test coverage.

## 2. Integration Testing
- Test the database queries (Drizzle ORM) against a local PostgreSQL instance.
- Mock external services (e.g., Gemini API, Resend) using MSW (Mock Service Worker) or simple vitest mocks.

## 3. End-to-End (E2E) Testing
- **Framework**: Playwright.
- **Scope**: Core user flows:
  - Sign up & create workspace.
  - Generate ICP and review.
  - Approve a campaign.
- E2E tests should run on every PR in CI (GitHub Actions).

## 4. API Testing
- Use Supertest or native Node fetch to run tests against Next.js route handlers.
- Ensure authentication and role-based access control (RBAC) are thoroughly verified.
