# Refactor Spec Template

**Issue Title:** `refactor: <system component>`

## Summary
Outline the technical debt or maintainability problem to address.

## Motivation
- Why the current implementation is insufficient
- Risks of leaving the code as-is
- Opportunities unlocked by the refactor

## Scope
- Systems/components to touch
- Interfaces or contracts that must remain stable
- Migration strategy (if applicable)

## Acceptance Criteria
- [ ] Legacy patterns removed or replaced
- [ ] New structure documented in `ARCHITECTURE.md`
- [ ] Tests updated to reflect the new design

## Risks & Mitigations
- Potential regressions and how to guard against them
- Rollback strategy if issues arise

## Testing Strategy
- Unit tests to update/create
- Integration/E2E scenarios to verify
- Tooling updates (linters, type checks) needed

## Follow-up Tasks
List any clean-up that should be ticketed separately.
