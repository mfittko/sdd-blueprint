# Spec-Driven Development (SDD) Blueprint

This directory provides a blueprint repository for spec-driven, AI-powered software development. It is evolving into a self-cont
ained package that can be copied into any TypeScript monorepo with microservices and front-end clients. The current drop include
s a fully working recipe feature that demonstrates how to apply the Slidev playbook to real code while keeping the path open for
additional services and UIs.

## What's Inside

- **Rules & Conventions** – Coding, commit, and documentation standards for humans and AI agents.
- **Documentation Hub** – End-to-end guides (`docs/`) covering development workflow, GitHub process, troubleshooting, and slide
 alignment.
- **Executable Example Feature** – A recipe service with API handlers, persistence adapters, and tests illustrating spec-driven
 flow.
- **Quality Gates** – Strict linting, unit/integration tests with coverage thresholds, and Playwright E2E exercises.
- **Tooling & Scripts** – Runnable npm scripts for dev server, linting, tests, coverage, and builds.

Use this as a starting point for new SDD projects or as a reference for best practices.

## Development Status

🚧 **Under Development**: This blueprint is currently being developed on the `feat/sdd-blueprint` branch within the parent reposi
tory. It will remain here for iterative development and testing until ready for extraction to a standalone repository.

See `../plan/BLUEPRINT.md` for the complete development plan and timeline.

## Output Target

Our goal is to ship `docs/sdd-example/` as a **standalone SDD reference implementation**. When extracted it will provide:

- Monorepo-friendly service modules that illustrate how to scale beyond the recipe slice.
- A blueprint for wiring additional microservices through shared contracts and adapters.
- Front-end integration patterns (UI, story-based, or API client) that stay in lockstep with service specs.
- Turnkey tooling—lint/test/build/CI scripts, MCP workflows, changelog discipline—so no parent-repo assumptions remain.

Every follow-up to the blueprint plan should move us closer to this outcome.

## Quick Links

- `docs/DEVELOPMENT.md` – Daily workflow, commit/PR expectations, and changelog guidelines.
- `docs/GITHUB_WORKFLOW.md` – MCP-first GitHub and review process walkthrough.
- `docs/TROUBLESHOOTING.md` – Runbooks for CI, dependency, and local environment issues.
- `docs/spec-templates/` – Issue templates for features, bugs, refactors, and docs updates.
- `docs/SLIDEV_ALIGNMENT.md` – Maps the Slidev presentation themes to actionable blueprint tasks.
- `docs/EXECUTION_CHECKLIST.md` – Phase-by-phase tracker aligned with the blueprint plan.
- `docs/TESTING.md` – Coverage thresholds, command palette, and mocking guidelines.
- `QUICKSTART.md` – Copy-paste setup instructions for kicking off a new repo.

## Example Feature Overview

The example implementation centres on a recipe catalogue inspired by *Grossmutters Rezepte*:

- `src/lib/recipes/` – Domain service, validation schema, slug helper, and repository abstractions.
- `src/api/recipes/route.ts` – API handlers that mirror Next.js-style route exports with clear error mapping.
- `src/server.ts` – Lightweight HTTP server used by `npm run dev` for manual poking.
- `src/data/recipes.ts` – Seed data demonstrating how to hydrate repositories without hitting production services.
- `tests/unit` – Vitest suites validating service logic, slug generation, and conflict handling.
- `tests/integration` – API-level tests executing the same handlers that a framework route would expose.
- `tests/e2e` – Playwright flows proving human-centric outcomes (browsing and submitting recipes) without a full UI framework.

### Data layer primer

The blueprint intentionally ships with an **in-memory repository** (`createInMemoryRecipeRepository`) instead of a database driver. It demonstrates the adapter pattern championed in the Slidev deck:

- Start with a dependency-free implementation so specs and tests can be written immediately.
- Inject the repository through the service constructor, keeping transports and domain code untouched.
- Swap in a persistent adapter later (SQLite, Postgres, etc.) by implementing the same `RecipeRepository` contract and updating the composition root.

See `docs/ARCHITECTURE.md` for a detailed walkthrough and replacement checklist.

## Scripts

```bash
npm install          # install dependencies
npm run dev          # start the lightweight recipe API server
npm run lint         # lint all TypeScript files
npm run test         # run Vitest in CI mode
npm run test:watch   # interactive test watch mode
npm run test:unit    # unit tests only
npm run test:integration # integration tests only
npm run test:e2e     # Playwright browser flows
npm run test:coverage # enforce coverage thresholds
npm run build        # emit compiled TypeScript to ./dist
```

## Next Steps

See `docs/plan/BLUEPRINT.md` for the roadmap and `docs/EXECUTION_CHECKLIST.md` for task-level tracking as we move through Phases
 2–5.
