# SDD Blueprint – Quick Start

Use this guide to spin up the blueprint locally, explore the working recipe feature, and understand how to adapt it for your tea
m. It assumes you plan to copy `docs/sdd-example/` into a standalone repository that hosts TypeScript microservices and related
front-ends.

## What's Included

### 📚 Documentation
- **AGENTS.md** – Instructions for AI coding agents.
- **DEVELOPMENT.md** – Setup, daily workflow, and PR hygiene tied to the Slidev deck.
- **TESTING.md** – Coverage policy, command map, and mocking conventions.
- **ARCHITECTURE.md** – System design overview.
- **API.md** – Blueprint API documentation pattern.

### 💻 Example Code
- **API routes** (`src/api/recipes/route.ts`) – Fetch and mutate recipes with structured error responses.
- **Business logic** (`src/lib/recipes/`) – Domain service, validation, slug utility, and repository implementations.
- **Data seeds** (`src/data/recipes.ts`) – Reference content for testing and local development.
- **HTTP server** (`src/server.ts`) – Minimal server for `npm run dev` that reuses the same handlers as frameworks.
- **Types** (`src/types/recipe.ts`) – Shared contracts across layers.
- **Tests** (`tests/`) – Unit, integration, and Playwright E2E coverage with ≥90% statement/function thresholds.

### ⚙️ Configuration
- **TypeScript** – Strict mode, module resolution, and build output via `tsconfig.json` + `tsconfig.build.json`.
- **Vitest** – Test runner with coverage thresholds defined in `vitest.config.ts`.
- **Playwright** – Headless browser specs configured in `playwright.config.ts` (no dev server required).
- **ESLint** – Flat config enforcing `@typescript-eslint` rules and `no-floating-promises`.
- **GitHub Actions** – CI template ready to expand once Phase 3 automation lands.

### 📋 Templates
- **GitHub Issues** – Feature/bug/refactor/docs specs with acceptance criteria checklists.
- **Pull Requests** – PR template aligned with atomic commit workflow.
- **CHANGELOG.md** – Keep-a-Changelog format capturing merged work.

### 🎯 Output Target
- `docs/sdd-example/` should be copy-paste ready as its own repository root.
- Service modules must demonstrate how to extend the recipe slice into additional microservices without rewriting the tooling.
- Front-end consumers (Next.js app, component stories, or API clients) should stay aligned with the same specs and fixtures.
- CI/CD and MCP workflows must run locally and in GitHub without requiring parent-repo configuration.

## Directory Structure

```
docs/sdd-example/
├── README.md
├── QUICKSTART.md
├── CHANGELOG.md
├── package.json
├── tsconfig.json
├── tsconfig.build.json
├── vitest.config.ts
├── playwright.config.ts
├── eslint.config.js
├── docs/
│   ├── AGENTS.md
│   ├── DEVELOPMENT.md
│   ├── TESTING.md
│   ├── GITHUB_WORKFLOW.md
│   ├── TROUBLESHOOTING.md
│   ├── SLIDEV_ALIGNMENT.md
│   └── EXECUTION_CHECKLIST.md
├── src/
│   ├── api/
│   │   └── recipes/
│   │       └── route.ts
│   ├── data/
│   │   └── recipes.ts
│   ├── lib/
│   │   ├── errors.ts
│   │   ├── slug.ts
│   │   └── recipes/
│   │       ├── in-memory-repository.ts
│   │       ├── repository.ts
│   │       ├── schema.ts
│   │       └── service.ts
│   ├── server.ts
│   └── types/
│       └── recipe.ts
└── tests/
    ├── unit/
    │   ├── recipe-service.test.ts
    │   └── slug.test.ts
    ├── integration/
    │   └── recipes-route.test.ts
    └── e2e/
        └── recipe-flow.spec.ts
```

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Run the recipe server**
   ```bash
   npm run dev
   ```
   The server listens on `http://localhost:3000` with two endpoints:
   - `GET /recipes` – List all recipes or filter with `?query=butter`.
   - `POST /recipes` – Create a recipe (accepts JSON body matching `RecipeInput`).
3. **Execute quality gates**
   ```bash
   npm run lint
   npm run test
   npm run test:coverage
   npm run test:e2e
   npm run build
   ```
4. **Study the docs** – Start with `docs/DEVELOPMENT.md` and `docs/GITHUB_WORKFLOW.md` to understand day-to-day expectations.
5. **Copy + adapt** – Use this blueprint as the seed for your own repo, keeping the Slidev-aligned guardrails intact.

### Swapping the repository adapter

The dev server and tests default to the in-memory repository factory: `createInMemoryRecipeRepository(seed)`. To adopt a persistent store:

1. Implement a new adapter in `src/lib/recipes/` (for example, `sqlite-repository.ts`) that fulfills the `RecipeRepository` interface exported from `repository.ts`.
2. Update your composition root (tests, server bootstrap, or framework-specific entry point) to pass the new adapter into `createRecipeService`.
3. Keep the in-memory adapter available for fast unit/integration tests; add targeted suites for the new adapter to ensure parity.
4. Document the change in `docs/ARCHITECTURE.md`, `docs/TESTING.md`, and the changelog so downstream teams know which adapter is canonical.

The architecture is intentionally swap-friendly so blueprint consumers can start with the same spec-driven flow and layer in infrastructure when the spec calls for it.

## Workflow Example

1. **Open a spec** using `docs/spec-templates/FEATURE.md` and capture acceptance criteria.
2. **Write tests first** (`tests/unit` or `tests/integration`) to codify the behaviour.
3. **Implement the feature** inside `src/lib/recipes` or the relevant module.
4. **Update documentation** (`docs/TESTING.md`, `CHANGELOG.md`, etc.) alongside the code.
5. **Raise a PR** using MCP commands, referencing the spec, and ensuring all checks pass.

## Additional Resources

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Keep a Changelog](https://keepachangelog.com/)
- [Model Context Protocol](https://modelcontextprotocol.io/)
- Parent repo root (`../..`) for production implementations and patterns.

---

**Build with discipline: specs → tests → implementation → docs → review.**
