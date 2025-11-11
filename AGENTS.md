# Agent Instructions

This file contains instructions for AI coding agents working with this codebase.

## Core Principles

**Spec-Driven Development**: All work must be tracked via GitHub Issues (specs) with clear acceptance criteria.

**Test-First**: Write tests before implementation. Maintain high coverage (≥90% statements/functions, ≥80% branches).

**Documentation**: Keep docs in sync with code. Update CHANGELOG.md for all changes.

## Development Workflow

1. **Start from a spec**: Every task begins with a GitHub Issue
2. **Write tests first**: Define expected behavior in tests
3. **Implement**: Write minimal code to satisfy specs and tests
4. **Document**: Update relevant docs and CHANGELOG.md
5. **Review**: Ensure all acceptance criteria are met

## Commit Conventions

Use Conventional Commits:
```
type(scope): description

[optional body]
[optional footer]
```

Types: `feat`, `fix`, `docs`, `test`, `refactor`, `chore`, `ci`

## Testing Standards

- Use testing framework appropriate to your stack
- Mock external services and LLM calls
- Maintain coverage thresholds
- Run all tests before committing

## Code Standards

- Use strict type checking
- Keep functions small and pure
- No side effects on import
- Follow language-specific best practices

## Git Workflow

- Make atomic, logically grouped commits
- Never bulk-commit entire directories
- PR title: `[area] short summary`
- Use MCP tools for all GitHub operations

## Documentation

- API changes → API.md
- Architecture changes → ARCHITECTURE.md
- New features → Update relevant docs
- All merged changes → CHANGELOG.md

## Critical Rules

- **CHANGELOG.md is for merged changes only** - document final state, not PR mechanics
- **PR descriptions document final state only** - no intermediate states or process details
- **Initial file additions are not "changes"** - focus on modifications to existing files

For detailed context, see individual doc files in `docs/`.
