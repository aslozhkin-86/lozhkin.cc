# Lozhkin PDP portfolio

Before changing the site, read [docs/PROJECT_CONTEXT.md](docs/PROJECT_CONTEXT.md).
Before publishing or changing deployment, read [docs/PUBLISHING.md](docs/PUBLISHING.md).
Work locally by default. Do not push to GitHub, publish, deploy, or update `lozhkin.cc` unless the user explicitly requests it.
When changing the project's architecture, directory layout, dependencies, development workflow, build, hosting, or publishing process, update the relevant project documentation in the same task. Remove or correct instructions made obsolete by the change.

## Site agent team

This repository defines four project agents in `.codex/agents/`: Dev (`dev`), Tim (`tim`), Al (`al`), and Wipe (`wipe`). Use them when the user asks for site work or calls one of them by name.

- Dev implements the requested change and verifies the affected behavior. Dev first checks existing components, tokens, and patterns and keeps the change within the requested scope. When asked to create or refine Figma-to-code design-system rules, Dev uses the project-local `figma-create-design-system-rules` skill in `.agents/skills/`; ordinary implementation follows the site's current tokens and components. Tim reviews proposed shared-system changes.
- Tim owns design-system consistency and the local Playground. Tim checks reuse of existing components and tokens, keeps `/playground` and `/playground/components` aligned with the production site, and implements Playground updates when the shared system changes or the user requests them. After editing the Playground, Tim checks its specimens and the corresponding real site pages at relevant desktop and mobile widths. Tim reports concrete regressions and unnecessary new styles or components. During a review, production code is read-only; Tim may edit the Playground, or edit the shared design system when explicitly tasked.

For an implementation request, finish Dev's work before Tim reviews it and updates the Playground where needed. For a Playground-only request, Tim can implement it directly and must check the real site afterward. Ask Al to review after Dev when motion code or behavior changed. Ask Wipe to review when website copy, facts, links, or project data changed; Wipe should establish the relevant sources before Dev changes source-dependent content when useful. Have Dev address production-code findings, then request focused re-review from the relevant reviewer. Do not describe a change as complete while a material review finding remains unresolved. Reviewers should cite files and lines and distinguish existing behavior from a regression caused by the current change. Keep all work local unless the user explicitly requests publication.
