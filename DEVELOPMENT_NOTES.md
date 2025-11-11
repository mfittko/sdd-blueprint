# Development Notes

## Branch Strategy

This blueprint is being developed within the parent repository using a dedicated branch strategy:

### Current Branch: `feat/sdd-blueprint`

All blueprint development work happens on this branch until the blueprint is ready for extraction to a standalone repository.

### Why This Approach?

1. **Easy Reference**: Direct access to parent repo's implementation patterns
2. **Incremental Extraction**: Can copy and adapt code/docs piece by piece
3. **Testing**: Verify blueprint alongside real implementation
4. **Context**: Keep development history and context together
5. **Flexibility**: Can merge updates back to main or keep separate

### Workflow

```bash
# Check current branch
git branch

# Switch to blueprint branch
git checkout feat/sdd-blueprint

# Make changes to docs/sdd-example/
# ... edit files ...

# Commit changes
git add docs/sdd-example/
git commit -m "feat(blueprint): description of changes"

# Push to remote (when ready)
git push origin feat/sdd-blueprint
```

### Merge Strategy

**Option 1: Keep Separate Until Extraction**
- Maintain `feat/sdd-blueprint` as long-lived branch
- Regularly sync with main/parent if needed
- Extract to standalone repo when Phase 5 is complete
- Then merge to main with note about extraction

**Option 2: Incremental Merges**
- Create PRs to merge blueprint updates to main
- Blueprint lives in `docs/sdd-example/` on main branch
- Continue development on `feat/sdd-blueprint`
- Extract when ready

**Current Decision**: Option 1 (keep separate until extraction)

### When to Extract

Extract to standalone repository when:
- [ ] All 5 phases of BLUEPRINT.md are complete
- [ ] Documentation is comprehensive and tested
- [ ] Example code is fully functional
- [ ] CI/CD pipeline works independently
- [ ] Blueprint has been validated with real projects
- [ ] Team agrees it's ready for public release

### Branch Lifecycle

```
feat/slidev-presentation (or main)
    ↓
    └─→ feat/sdd-blueprint (created 2025-11-11)
            ↓
            └─→ [iterative development here]
                    ↓
                    └─→ [extract to standalone repo]
                            ↓
                            └─→ merge back to main (with link to new repo)
```

## File Structure

All blueprint files live under:
```
docs/sdd-example/
├── README.md
├── QUICKSTART.md
├── DEVELOPMENT_NOTES.md (this file)
├── docs/
├── src/
├── tests/
├── .github/
└── [config files]
```

Plan document lives at:
```
docs/plan/BLUEPRINT.md
```

## Git Best Practices for Blueprint Work

### Commits
- Use conventional commits: `feat(blueprint): description`
- Keep commits focused and atomic
- Reference phase numbers when applicable: `feat(blueprint): complete Phase 1 - documentation enhancement`

### PRs (when needed)
- Title: `[blueprint] description`
- Link to BLUEPRINT.md for context
- Use the standard PR template
- Mark as draft until phase is complete

### Issues (optional)
- Create issues for each phase of BLUEPRINT.md
- Label with `blueprint` tag
- Link issues to BLUEPRINT.md for reference

## Notes for AI Agents

When working on this blueprint:

1. **Always work on `feat/sdd-blueprint` branch**
2. **All changes go to `docs/sdd-example/` or `docs/plan/BLUEPRINT.md`**
3. **Follow the 5-phase plan in BLUEPRINT.md**
4. **Use conventional commits with `blueprint` scope**
5. **Test changes don't break parent repo**
6. **Keep documentation in sync with code**

## Timeline

- **Created**: 2025-11-11
- **Current Phase**: Planning complete, ready for Phase 1
- **Estimated Completion**: ~1-2 weeks for all phases
- **Extraction Target**: TBD (when all phases complete)

---

**Branch**: `feat/sdd-blueprint`
**Status**: Active development
**Last Updated**: 2025-11-11
