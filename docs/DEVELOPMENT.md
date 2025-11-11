# Development Guide

Use this guide for day-to-day work on this blueprint repository. See CHANGELOG.md for version history.
LUEPRINT.md`, the Slidev alignment notes, and `docs/AGENTS.md`.

## Setup

```bash
npm install
npm run dev
```

`npm run dev` boots a lightweight HTTP server on `http://localhost:3000` using the same recipe handlers that power the tests. Th
ere is no database dependency; seed data loads into an in-memory repository.

## Project Structure

```
the blueprint
├── docs/           # Blueprint documentation and templates
├── src/            # Recipe feature source code
├── tests/          # Vitest + Playwright suites
└── package.json    # Scripts and dependencies
```

## Core Commands

- `npm run dev` – Start the recipe API server.
- `npm run lint` – Lint all TypeScript with the shared ESLint config.
- `npm run test` – Run Vitest (unit + integration) in CI mode.
- `npm run test:coverage` – Enforce ≥90% coverage thresholds.
- `npm run test:e2e` – Execute Playwright browser flows.
- `npm run build` – Compile TypeScript to `dist/` via `tsc`.

> ℹ️ Always run `npm run test` **and** `npm run build` before opening a PR. Run `npm run test:e2e` when touching flows, and cite e
very command in the PR template.

## Environment Variables

Copy `.env.example` to `.env` and set any required values. The blueprint defaults to mock/in-memory adapters, so most work does n
ot require local secrets.

## Conventional Commit Examples

Conventional commits document intent and scope. Real commits from this repository show the tone and structure reviewers expect:

- `feat(blueprint): create SDD blueprint structure and documentation` (commit `e92efa8`)
  - Captures the initial import of the blueprint skeleton and supporting docs/tests/config. The body enumerates each major addit
ion so reviewers can skim the diff quickly.
- `docs(blueprint): add development notes and branch strategy` (commit `06c015b`)
  - Pure documentation change focused on process guidance. The body summarises why work stays on `main` and highli
ghts expectations for AI agents.

When writing commit messages:

1. Pick the right **type** (`feat`, `fix`, `docs`, `test`, `refactor`, `ci`, `chore`).
2. Scope with the affected area (e.g., `blueprint`, `api`, `ui`).
3. Keep the subject ≤ 72 characters and action-oriented.
4. Use the body for bullet-point context when the diff is non-trivial.

## Pull Request Expectations

Follow the PR template verbatim. A solid PR includes:

1. **Linked spec** – Reference the GitHub issue that defines scope.
2. **Summary** – Bullet the user-facing changes that will exist after merge.
3. **Testing** – List every command run locally (`npm run lint`, `npm run test`, `npm run test:e2e`, `npm run build`, etc.) with
pass/fail status.
4. **Changelog** – Update `CHANGELOG.md` with Keep-a-Changelog formatting describing the merged state only.

## GitHub Workflow Overview

`docs/GITHUB_WORKFLOW.md` documents the MCP commands for filing specs, branching, pushing commits, and opening PRs. Refer back t
o it whenever you hand off to a reviewer.

## Testing Workflow

1. **Test-first** – Write or update tests before implementing features.
2. **Mock external services** – Use the in-memory repository; never call live services.
3. **Coverage** – Maintain ≥90% statements/functions and ≥80% branches (`vitest.config.ts`).
4. **Command reference**:
   ```bash
   npm run test           # Vitest (unit + integration)
   npm run test:unit      # Focus on unit suites
   npm run test:integration # Focus on API handler suites
   npm run test:e2e       # Playwright browser specs
   npm run test:coverage  # Coverage enforcement
   ```

## Troubleshooting

Common CI and dependency issues live in `docs/TROUBLESHOOTING.md`. Start there before re-running pipelines or amending commits.

## Contributing

`CONTRIBUTING.md` covers broader repository expectations (code style, review etiquette, CLA policies). Keep it handy when onboar
ding new contributors.
