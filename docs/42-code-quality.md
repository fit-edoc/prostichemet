# Code Quality

## 1. Static Analysis
- **TypeScript**: Strict mode enabled ("strict": true in 	sconfig.json). No ny types unless absolutely necessary.
- **ESLint**: Enforce Next.js and React best practices. Use a strict config to catch unused variables and floating promises.
- **Prettier**: Code formatting must be automated. Run Prettier on save and verify in CI.

## 2. Code Review Practices
- All changes must go through a Pull Request (PR).
- PRs must have at least one approval before merging.
- CI must pass (Build, Lint, Tests) before merging.

## 3. Commit Standards
- Follow Conventional Commits (e.g., eat: add lead scoring, ix: handle email bounce webhook).
- This standardizes the git history and allows for automated changelog generation.
