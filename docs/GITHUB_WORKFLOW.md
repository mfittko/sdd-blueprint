# GitHub Workflow Guide

This document walks through the complete lifecycle for blueprint work: from drafting a spec to merging a pull request. Follow these steps for every change to keep the blueprint aligned with spec-driven development.

## 1. Draft the Spec (GitHub Issue)

1. Run `mcp_github_github_create_issue` with the appropriate template (feature, bug, refactor, or docs) from `docs/spec-templates/`.
2. Fill in:
   - **Summary** – one-sentence problem or goal.
   - **Context** – why the change is needed, linking to relevant docs.
   - **Acceptance Criteria** – bullet list of verifiable outcomes.
   - **Testing Notes** – commands or data requirements.
3. Label the issue with the corresponding phase (e.g., `Phase:1-Documentation`).
4. Assign the issue to yourself before starting work.

## 2. Create a Branch

1. Checkout the tracking branch (`main`).
2. Create a feature branch named after the issue: `git checkout -b main/<short-slug>`.
3. Keep branches focused on a single spec.

## 3. Work Locally

1. Write or update tests first (unit, integration, and/or docs tests if applicable).
2. Implement the minimal code to satisfy the acceptance criteria.
3. Update documentation and changelog entries alongside code changes.
4. Run the full local suite:
   ```bash
   npm run lint
   npm test
   npm run build
   ```
5. Commit using Conventional Commit formatting. Reference the issue number in the commit body if helpful.

## 4. Open the Pull Request

1. Push the branch: `git push -u origin main/<short-slug>`.
2. Use `mcp_github_github_create_pull_request` to open the PR.
3. Fill out every field in `.github/PULL_REQUEST_TEMPLATE.md`:
   - Link the spec issue (`Closes #<issue-number>`).
   - Summarize final user-visible changes.
   - List all local test/build commands with outcomes.
   - Confirm changelog updates.
4. Request a reviewer familiar with the blueprint (or tag `@maintainers` if unsure).

## 5. Review & Iterate

1. Address feedback with follow-up commits (avoid force pushes unless rebasing for merge).
2. Keep the PR description updated if scope changes.
3. Ensure CI is green before requesting re-review.

## 6. Merge

1. Once approved and green, use the repository’s preferred merge strategy (`Squash and merge` for single-spec branches).
2. Verify the changelog entry landed under the correct date and section.
3. Close the linked issue if the automation does not do so automatically.

## 7. Post-Merge Housekeeping

1. Pull the updated `main` branch locally.
2. Delete the feature branch both locally and remotely.
3. Capture any follow-up ideas as new issues rather than reopening merged PRs.

## MCP Command Reference

| Task | Command |
| --- | --- |
| Create issue | `mcp_github_github_create_issue` |
| Update issue | `mcp_github_github_update_issue` |
| Create PR | `mcp_github_github_create_pull_request` |
| Comment on PR/issue | `mcp_github_github_create_comment` |
| Request review | `mcp_github_github_request_review` |

Use only the MCP commands above for GitHub interactions; standard git commands are limited to local operations.
