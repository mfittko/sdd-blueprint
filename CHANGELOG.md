# Changelog

All notable changes to this blueprint will be documented here, following [Keep a Changelog](https://keepachangelog.com/) and semantic versioning.

## [Unreleased]

### Added - 2025-11-15
- **Standalone target guardrails**
  - Introduced a `Target Outcome` section in `docs/plan/BLUEPRINT.md` clarifying the blueprint's end-state for monorepo microservices and front-ends.
  - Expanded `docs/EXECUTION_CHECKLIST.md` with tasks covering multi-service expansion, UI alignment, contract testing, and extraction readiness.

### Changed - 2025-11-15
- Reframed `README.md` and `QUICKSTART.md` to emphasise the standalone blueprint deliverable and add output checklists.
- Updated `docs/ARCHITECTURE.md` and `docs/SLIDEV_ALIGNMENT.md` to describe how additional services and clients plug into the example stack.
- Restructured `eslint.config.js` to export a named config before the default export so linting passes without warnings.

### Added - 2025-11-14
- **Data layer guidance**
  - Rewrote `docs/ARCHITECTURE.md` with detailed layering, request lifecycle, and adapter swap instructions.
  - Expanded `docs/EXECUTION_CHECKLIST.md` with Phase 3 tasks for persistent repositories and contract testing.

### Changed - 2025-11-14
- Clarified in-memory repository usage throughout the README, Quickstart, and Testing guide.
- Updated `docs/plan/BLUEPRINT.md` to reflect completed phases and highlight upcoming data-layer work.

### Added - 2025-11-13
- **Phase 2 working example**
  - Replaced stub scripts with runnable lint/test/build commands and strict ESLint config.
  - Implemented a recipe domain service, in-memory repository, and seeded HTTP server.
  - Added comprehensive unit, integration, and Playwright E2E tests enforcing ≥90% coverage.

### Changed - 2025-11-13
- Updated documentation (`README.md`, `QUICKSTART.md`, `DEVELOPMENT.md`, `TESTING.md`) to describe the executable example.
- Checked off Phase 1 and Phase 2 tasks in `docs/plan/BLUEPRINT.md` and `docs/EXECUTION_CHECKLIST.md`.

### Added - 2025-11-12
- **Slidev alignment resources**
  - Introduced `docs/SLIDEV_ALIGNMENT.md` to translate the slide deck into blueprint guardrails.
  - Added `docs/EXECUTION_CHECKLIST.md` to track blueprint delivery tasks phase by phase.

### Changed - 2025-11-12
- Updated `docs/plan/BLUEPRINT.md` with slide-referenced guidance and checkbox-driven task tracking.
- Linked the new alignment resources from `README.md` for easy discovery.

### Added - 2025-11-11
- **Phase 1 documentation assets**
  - Expanded `docs/DEVELOPMENT.md` with real commit/PR examples and changelog guidance
  - Authored `docs/GITHUB_WORKFLOW.md` covering MCP-driven specs and PR flow
  - Added `docs/TROUBLESHOOTING.md` with CI and environment fixes
  - Introduced issue spec templates under `docs/spec-templates/`

### Changed - 2025-11-11
- Linked new documentation resources from `docs/sdd-example/README.md`