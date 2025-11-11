# Slidev Alignment Guide

This guide translates the `slides.md` presentation into actionable principles for the SDD blueprint. Use it to keep new work anchored to the narrative presented in the deck.

## Key Themes → Blueprint Applications

| Slide Theme | Blueprint Application |
| --- | --- |
| **LLM Capability Explosion** & **Spec-Driven Solution** | Treat specifications, not ad-hoc prompts, as the durable artifact. Every blueprint example must start from a written spec, issue template, or checklist that AI agents can execute without improvisation. |
| **The Vibe-Coding Problem** | Reinforce guardrails in `docs/AGENTS.md`, GitHub workflows, and templates so contributors never rely on guesswork. The blueprint should demonstrate MCP-only GitHub operations, atomic commits, and enforced review gates. |
| **Key Insight: Constraining AI for Quality** | Highlight executable acceptance criteria, coverage thresholds, and template-driven workstreams. Where we provide examples, include the spec, implementation, and verification trio. |
| **WHAT > HOW Paradigm** | Document business outcomes (WHAT) before implementation details (HOW). The README, issues, and tutorials must emphasize problem statements, acceptance criteria, and cross-cutting qualities first. |
| **AI Amplification Loop** | Show how AI participates at each stage: assisting with spec authoring, executing code, and validating results. Link to tooling (MCP commands, tests, lint) that close the loop. |
| **Spec-Driven Framework** & **Atomic Commits & PR Workflow** | Mirror the staged setup (docs → templates → automation) in our folder layout and scripts. Demonstrate atomic commits, PR templates, and changelog expectations with real examples. |
| **Test-Driven Quality** | Maintain ≥90% coverage expectations, real test suites, and explicit coverage reporting instructions. Encourage mutation testing or review heuristics where feasible. |
| **Design Principles for AI-Driven Development** | Showcase SOLID, KISS, and typed boundaries in example code. Prefer explicit interfaces and dependency injection to make AI-generated code predictable. |
| **Monorepo Architecture for AI Development** | Demonstrate how the blueprint serves as a monorepo-ready template, showing nested AGENTS.md files for service-specific governance. |
| **CI/CD Pipeline** | Provide runnable workflows, coverage gates, and deployment placeholders that align with the pipeline diagram in the slides. |

## How to Apply the Slides While Building

1. **Start from a spec** – For any new example or enhancement, create or reference a GitHub Issue template entry before touching code.
2. **Codify guardrails immediately** – Update AGENTS instructions, templates, or tooling before (or alongside) implementation so AI agents learn the rules first.
3. **Prove the loop** – When adding examples, include: the spec (issue/template), the implementation, the tests/docs showing verification. This demonstrates the AI amplification loop end-to-end.
4. **Keep documentation narrative-rich** – Borrow copy or diagrams from the slides to explain *why* a process exists, not just *how* to execute it.
5. **Reference slide sections** – When committing substantial work, cite the relevant slide theme in commit messages or doc callouts. This keeps alignment explicit for reviewers.

## Phase-Specific Emphasis

- **Phase 1** – Focus on documentation, templates, and troubleshooting guides that embody the anti–vibe coding stance.
- **Phase 2** – Ensure the example implementation showcases SOLID patterns, typed boundaries, and coverage-backed tests highlighted in the slides while sketching how additional services and front-end consumers will plug in.
- **Phase 3** – Build CI/CD and automation that enforce the quality gates promised in the presentation.
- **Phase 4** – Add advanced scenarios (auth, caching, background jobs) plus client-facing blueprints (UI flows, SDKs) while keeping specs and diagrams front-and-center.
- **Phase 5** – Tell the extraction story using the AI amplification loop: document how the standalone repo remains spec-driven after migration.

## Contributor Checklist

- [ ] Reviewed `slides.md` before starting work.
- [ ] Linked each deliverable to at least one slide theme in commit messages or doc callouts.
- [ ] Ensured specs, implementation, and validation artifacts ship together.
- [ ] Updated documentation to explain the *why* behind new assets, not just the *what*.
- [ ] Verified the change advances one or more tasks in `docs/plan/BLUEPRINT.md`.
