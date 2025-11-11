# Architecture Overview

This document explains how the blueprint example is wired together and why the in-memory repository pattern is the default jumping-off point.

## Layered layout

```
docs/sdd-example/
├── src/
│   ├── api/recipes/route.ts        # Transport handlers that mirror Next.js route exports
│   ├── data/recipes.ts             # Canonical seed data shared across tests and dev server
│   ├── lib/
│   │   ├── errors.ts               # Domain error types surfaced by the service layer
│   │   ├── slug.ts                 # Pure utility for deterministic slug generation
│   │   └── recipes/
│   │       ├── repository.ts       # Repository contract + cloning helpers
│   │       ├── in-memory-repository.ts
│   │       └── service.ts          # Use-case orchestration, validation, and guards
│   ├── server.ts                   # Lightweight HTTP server that reuses the same handlers
│   └── types/recipe.ts             # Shared Recipe/RecipeInput contracts
└── tests/                          # Unit, integration, and E2E coverage for every layer
```

The blueprint keeps every layer independent so specs, tests, and implementations can evolve in lockstep:

- **Transport**: Route handlers accept a `RecipeService` dependency so they can run inside tests, the dev server, or any hosting environment without modification.
- **Domain**: The service encapsulates validation, slug creation, conflict detection, and mapping of repository errors into user-facing responses.
- **Data access**: The repository abstraction defines the minimal operations required by the service. Different persistence strategies can plug in without altering higher layers.

## Monorepo-ready blueprint

Even though the example only ships one service today, its boundaries are intentionally shaped for expansion:

- **Service modules** – Additional services should live beside `src/lib/recipes/`, exporting their own repositories and service factories while sharing cross-cutting utilities (errors, logging, tracing) via `src/lib/`.
- **Shared contracts** – Types under `src/types/` become the source of truth for both services and front-ends. Generate API clients or SDKs from these contracts to keep specs synchronized.
- **Front-end consumers** – UI packages (Next.js, Storybook, or component libraries) import service clients instead of reaching into repositories directly. Keep integration tests that exercise the API surface, not internals.
- **Tooling cohesion** – `package.json`, lint configs, and CI pipelines should treat each service/client as part of the same monorepo by running matrix builds or targeted commands.

## Why an in-memory repository?

The slide deck emphasises fast feedback, deterministic tests, and swap-friendly adapters. The `createInMemoryRecipeRepository` function satisfies those goals:

- **Fast iteration** – It stores recipes in a `Map` and clones data on read/write so tests and local runs stay isolated and state never leaks between scenarios.
- **Spec-first clarity** – With zero infrastructure dependencies, the repository can be instantiated directly inside unit and integration tests to express acceptance criteria before a real database exists.
- **Drop-in contract** – It implements the same `RecipeRepository` interface that future adapters (SQLite, Postgres, Blob storage, etc.) will conform to, making replacement a wiring change instead of a rewrite.

### How to swap the implementation

When you are ready to move beyond the teaching adapter, follow these steps:

1. **Create a new adapter** next to the in-memory implementation (for example, `sqlite-repository.ts`). Export a factory that returns an object matching the `RecipeRepository` interface.
2. **Inject via composition**. Update the composition root—`src/server.ts`, integration tests, or framework-specific bootstrap code—to call your new factory instead of `createInMemoryRecipeRepository`.
3. **Extend tests**. Keep the in-memory suites as contract tests and add integration coverage dedicated to the new adapter (e.g., spin up SQLite using `better-sqlite3` or supertest against a live service).
4. **Document the change** in `docs/ARCHITECTURE.md`, `docs/TESTING.md`, and the changelog so downstream teams know which adapter is authoritative.

This workflow mirrors the "Constraints enable quality" theme from the slides: start with a safe baseline, prove the behaviour with specs, then graduate to the infrastructure you actually need.

## Request lifecycle

1. **Request enters** `src/api/recipes/route.ts` via `GET` or `POST`.
2. The handler resolves a `RecipeService` (in tests we pass it directly; in the dev server we build it from the in-memory repository).
3. The service performs validation and delegates persistence to the repository.
4. Domain errors (`ValidationError`, `ConflictError`) bubble back to the handler, which converts them into HTTP responses.
5. The handler returns a framework-agnostic `Response` object so both Playwright tests and the dev server can consume the result.

## Testing the architecture

- **Unit tests** cover `createRecipeService`, slug generation, and repository behaviour in isolation.
- **Integration tests** call the route handlers with synthetic `Request` objects, verifying transport + domain wiring without needing a running server.
- **E2E tests** reuse the same service bindings inside Playwright, demonstrating that the architecture supports user-centric flows even without a full Next.js runtime.
- **Consumer contract tests** (Phase 3+) will generate API clients from `src/types/` and assert that front-end interactions remain compatible with service responses.

By keeping each layer pure and dependency-injected, the blueprint showcases how to follow the Slidev strategy in any target stack.
