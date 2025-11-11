# Troubleshooting Guide

This guide captures the most common problems encountered while working on the blueprint and how to unblock them quickly.

## Continuous Integration Failures

### Lint or Type Errors
- **Symptom**: `npm run lint` or `npm run build` fails on CI but passes locally.
- **Fix**:
  1. Ensure your local Node.js version matches the repo’s `.nvmrc` or `engines` field.
  2. Run `npm ci` in a clean clone to reproduce.
  3. Commit any missing type definitions or ESLint configuration updates.

### Coverage Drops Below Threshold
- **Symptom**: Vitest reports coverage below 90% statements/functions or 80% branches.
- **Fix**:
  1. Identify uncovered lines via `npm test -- --coverage` and inspect the generated report under `coverage/`.
  2. Add targeted unit tests for uncovered logic.
  3. Avoid lowering thresholds; the blueprint relies on high coverage as a teaching aid.

### Playwright E2E Flakes
- **Symptom**: E2E suite times out intermittently.
- **Fix**:
  1. Run tests locally with `npx playwright test --debug` to inspect steps.
  2. Add explicit `await expect(...).toBeVisible()` assertions before interacting with UI elements.
  3. Mock network calls in tests to avoid relying on external latency.

## Local Environment Issues

### Missing Environment Variables
- **Symptom**: Build or tests fail with `process.env.*` undefined errors.
- **Fix**:
  1. Copy `.env.example` to `.env` at the blueprint root.
  2. Populate required keys (LLM adapters default to mock mode if unset).
  3. Re-run `npm run dev` or the relevant test command.

### SQLite Permission Errors
- **Symptom**: `SQLITE_CANTOPEN` or file-lock errors when running integration tests.
- **Fix**:
  1. Ensure the `tmp/` directory exists and is writable.
  2. Delete any stale `.sqlite` files in `tmp/` and rerun tests.
  3. On macOS/Linux, verify no other process is holding the file lock via `lsof`.

### Dependency Resolution Problems
- **Symptom**: `npm install` fails with conflicting peer dependencies.
- **Fix**:
  1. Remove `node_modules/` and `package-lock.json`, then run `npm install`.
  2. If conflicts persist, align dependency versions with the main repository (check `package.json` there).
  3. Commit any resolved lockfile updates.

## Debugging Strategies

1. Reproduce issues locally in watch mode when possible.
2. Use `console.debug` sparingly and remove before committing.
3. Capture failing commands and outputs in the PR discussion for reviewer context.
4. When blocked, open a draft PR referencing the spec and request pairing support.
