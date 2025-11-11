# Blueprint Execution Checklist

This checklist tracks actionable tasks required to deliver the blueprint in alignment with the Slidev deck and `docs/plan/BLUEPR
INT.md`.

## Phase 1 – Documentation Enhancements

- [x] Map slide themes to blueprint docs (`docs/SLIDEV_ALIGNMENT.md`).
- [x] Expand `docs/DEVELOPMENT.md` with additional PR/commit walkthroughs tied to slide examples.
- [x] Annotate `docs/GITHUB_WORKFLOW.md` with MCP command snippets and diagrams of the AI amplification loop.
- [x] Extend `docs/TROUBLESHOOTING.md` with CI, dependency, and environment runbooks.
- [x] Polish issue templates under `docs/spec-templates/` with acceptance-criteria checklists and coverage reminders.
- [x] Link all new/updated docs from `README.md` and `QUICKSTART.md`.

## Phase 2 – Working Examples

- [x] Replace stub dependencies/scripts in `package.json` with runnable lint/test/build/coverage commands.
- [x] Implement a complete example feature across `src/api`, `src/lib`, and `src/types` showcasing SOLID design.
- [x] Add persistence adapters (in-memory repository demonstrating adapter pattern).
- [x] Write unit tests (`tests/unit/`) covering ≥90% statements/functions.
- [x] Write integration tests (`tests/integration/`) exercising route handlers with synthetic `Request` objects.
- [x] Ship Playwright E2E tests (`tests/e2e/`) proving the full workflow.
- [x] Document coverage enforcement in `docs/TESTING.md` and tooling configs.
- [ ] Blueprint multi-service expansion
  - [ ] Document the folder structure and dependency rules for adding a second service module.
  - [ ] Provide a spec template or example issue describing how to split work between services while keeping shared contracts centralised.
- [ ] UI alignment patterns
  - [ ] Provide at least one UI/component/state example (if applicable) with corresponding tests or stories.
  - [ ] Explain how UI specs map to backend contracts and fixtures.

## Phase 3 – CI/CD & Automation

- [ ] Replace `.github/workflows/ci.yml` stub with lint, type-check, test, build, and coverage reporting jobs.
- [ ] Add caching and matrix strategies (Node versions or environments) as needed, including per-service and front-end targets.
- [ ] Introduce deployment/CD workflow (staged environments, rollback guidance).
- [ ] Configure Dependabot (or Renovate) for dependency updates.
- [ ] Add automation for PR labeling and changelog updates.
- [ ] Introduce contract-testing workflows to guarantee compatibility between services and clients.
- [ ] Install Husky/lint-staged (or equivalent) enforcing lint/test on staged files.
- [ ] Document the CI/CD process in `docs/OPERATIONS.md` or a new deployment guide.
- [ ] Ship persistent data adapters (`src/lib/recipes/*`)
  - [ ] Implement at least one database-backed repository that satisfies `RecipeRepository`.
  - [ ] Extend tests/fixtures so the contract suite runs against both in-memory and persistent adapters.
  - [ ] Update docs (`ARCHITECTURE.md`, `TESTING.md`, `QUICKSTART.md`) with swap instructions and operational notes.
  - [ ] Provide scripts or docs for seeding local dev databases across services.

## Phase 4 – Advanced Resources

- [ ] Author authentication, rate limiting, caching, and background-job examples.
- [ ] Provide adapters/pattern docs for storage, LLM, and feature flags.
- [ ] Publish a front-end reference (Next.js route, component story, or CLI client) that consumes the recipe service contracts.
- [ ] Create architecture, data-flow, and CI/CD diagrams (Mermaid or similar) and embed them in `docs/ARCHITECTURE.md`.
- [ ] Write a step-by-step tutorial or guided lab that replays the slide deck narrative with code.
- [ ] Add troubleshooting/FAQ entries for advanced scenarios.

## Phase 5 – Standalone Extraction

- [ ] Prepare migration checklist and dry-run extraction notes.
- [ ] Create new repository, copy assets, and configure branch protection + automation.
- [ ] Documentation updated for standalone repository.
- [ ] All scripts, assets, and configs are self-contained.
- [ ] Validate a fresh clone: install, lint, test, build, run Playwright, and inspect coverage artifacts.
- [ ] Capture an AI-agent dry run (spec → implementation) proving independence.
- [ ] Archive or document the legacy in-repo blueprint per branch strategy.

## Tracking Guidance

- Update this checklist (or its GitHub Issue twin) as tasks complete.
- Reference `docs/plan/BLUEPRINT.md` and `docs/SLIDEV_ALIGNMENT.md` when clarifying scope.
- Ensure each checked item has corresponding tests/docs/changelog updates.
