# Example Implementation

This directory contains the executable recipe feature that powers the SDD blueprint. It demonstrates how to structure domain logi
c, API handlers, and tests so they can be lifted into a new project with minimal friction.

## Structure

- `api/recipes/route.ts` – Framework-agnostic route handlers exporting `GET`/`POST` the same way a Next.js App Router file would.
- `data/recipes.ts` – Seed inputs used by the in-memory repository and tests.
- `lib/` – Domain primitives:
  - `errors.ts` – Shared error types for validation/conflict/not-found scenarios.
  - `slug.ts` – Deterministic slug generation with diacritic support.
  - `recipes/` – Repository interface, in-memory adapter, validation schema, and service orchestrating domain behaviour.
- `server.ts` – Minimal Node HTTP server consumed by `npm run dev` so humans can poke the API locally.
- `types/recipe.ts` – Shared TypeScript contracts for inputs and persisted recipes.

## Usage Patterns

1. **Inject repositories** – Handlers call into `RecipeService`, letting specs swap storage implementations easily.
2. **Validate up front** – Zod schemas translate into actionable `ValidationError` details for clients.
3. **Share seeds** – `recipeSeeds` keep unit, integration, and E2E tests aligned without reaching for fixtures on disk.
4. **Promote purity** – Business logic stays free of transport concerns so AI agents can focus on targeted changes.

Use these patterns as the baseline when crafting features in downstream projects.
