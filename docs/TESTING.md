# Testing Guide

## Philosophy

- **Test-first development** – Specs become executable guarantees, so write tests before implementation.
- **High coverage** – Maintain ≥90% statements/functions and ≥80% branches (enforced via Vitest).
- **Mock external services** – Use in-memory adapters and fixtures; no live network calls.

## Command Palette

```bash
npm run test           # Run all Vitest suites in CI mode
npm run test:watch     # Interactive watch mode for unit + integration suites
npm run test:unit      # Unit tests only
npm run test:integration # Integration tests only
npm run test:e2e       # Playwright browser flows
npm run test:coverage  # Vitest with coverage thresholds enforced
```

## Coverage

Coverage thresholds live in `vitest.config.ts`:

- **Statements**: ≥90%
- **Functions**: ≥90%
- **Lines**: ≥90%
- **Branches**: ≥80%

CI and local developers must keep coverage at or above these marks. Add tests for new code paths—do not adjust the thresholds.

## Test Layers

| Layer        | Location                  | Purpose                                                        |
| ------------ | ------------------------- | -------------------------------------------------------------- |
| Unit         | `tests/unit`              | Pure domain logic (slug normalisation, recipe service).        |
| Integration  | `tests/integration`       | API handlers and repository wiring.                            |
| End-to-End   | `tests/e2e`               | Playwright user journeys powered by exposed service bindings.  |

## Patterns

- **Shared seeds** – `src/data/recipes.ts` hydrates repositories without external dependencies.
- **Dependency injection** – Handlers accept a `RecipeService`, letting tests swap repositories freely.
- **Error coverage** – Tests assert validation, conflict, and not-found cases so runtime behaviour is predictable.

## Mocking & Isolation

- Use the in-memory repository (`createInMemoryRecipeRepository`) in tests instead of spinning up databases.
- Avoid stubbing `fetch`/`Response`; Node 18+ provides WHATWG primitives compatible with the example handlers.
- For Playwright, prefer `page.exposeBinding` to bridge service logic rather than relying on full-stack servers.

When you introduce a new persistence adapter, treat the in-memory implementation as the contract oracle:

- Keep the existing suites intact—they guarantee the behaviour described in your specs.
- Add adapter-specific integration tests (for example, using SQLite fixtures) that call the same repository methods and assert parity with the in-memory expectations.
- Run both suites in CI so regressions in infrastructure-specific code never leak past Phase 3 quality gates.

## Adding New Tests

1. Start with acceptance criteria from the spec.
2. Choose the appropriate layer (unit/integration/e2e).
3. Write the failing test.
4. Implement the minimal code to make it pass.
5. Update docs and changelog entries alongside the code.
