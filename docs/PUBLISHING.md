# Publishing lozhkin.cc

The GitHub repository `aslozhkin-86/lozhkin.cc` is the only project repository. Edit files under `source/`. The `public/` folder is generated and must not be edited by hand.

Work locally by default. Push to GitHub and publish only when the user explicitly requests it. Update this guide in the same task whenever the publishing workflow or hosting architecture changes.

The local agent workflow is defined in `AGENTS.md` and `.codex/agents/`: Dev implements production site changes, checks changed motion against `docs/MOTION_RULES.md`, and verifies changed public content against current Notion and local source-of-truth material. Tim maintains the Playground and checks the real site afterward. Resolve material review findings before describing the local work as complete. These agent roles do not change the explicit approval required to publish.

Dev's project-local Figma design-system-rules skill is in `.agents/skills/figma-create-design-system-rules/`. It is for creating or updating agent rules; routine site edits continue to follow the existing tokens, CSS Modules, shared components, and local asset paths. The skill adds no build or publishing step.

1. Make the change in `source/`. Use the local dev server when the change affects layout or behavior.
2. Run `./scripts/publish.sh "Describe the site change"` from the repository root. For source changes, it builds the site and refreshes `public/`. It checks and commits the source, published files, and project documentation together, then pushes `main`. Documentation-only changes skip the build.
3. Check `https://lozhkin.cc/` after the hosting service updates. The checkout and GitHub match immediately after the push.

Run `cd source && pnpm test` when a change warrants the rendered-page checks. The publish command uses the build and static-output checks, so routine copy and spacing edits do not need an extra test pass.

The site is static. It has no database, preview password, or separate test-domain deployment. The former `card-portfolio` and `portfolio-site` folders are not part of this workflow.

The static-output check verifies the current homepage and expected project routes, including the Birmarket transformation article. The sync script copies every prerendered page to its `.html` path and a matching directory `index.html`, so direct project URLs resolve on the static host. Keep those checks aligned with the published site. Unpublished case drafts must stay outside this public repository.

The m10 overview uses the owner-supplied artwork `source/public/projects/m10/hero-project.jpg`, the shared client-side `DotParallax` layer, and `source/components/M10CaseMotion/` for hero and content motion. `ProjectHero` is shared by the project overviews and editorial case article, while `ProjectStoryCard` is shared by their related cases and the homepage Other Projects section. The shared color and type system lives in `source/styles/tokens.css`; both page types and the local playground use it. Keep active artwork in `source/public/` so the static build includes it; remove unused variants there before publishing.

The Birmarket transformation article at `/projects/birmarket/breaking-the-inertia` is approved for publication and included in the static output. Marketplace Vision 2027 remains unpublished; the publish script stops if its standalone route is restored to `source/`.

The local `/playground` Foundations route and `/playground/components` catalog are unpublished. Their source is archived at `/Users/alex/Documents/Lozhkin PDP/site-unpublished/playground/` and can be restored to `source/app/playground/` for local work. The publish script stops while that route exists in the source tree. Move it back to the archive before publishing, or obtain explicit owner approval to publish it and update the guard.
