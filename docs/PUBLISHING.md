# Publishing lozhkin.cc

The GitHub repository `aslozhkin-86/lozhkin.cc` is the only project repository. Edit files under `source/`. The `public/` folder is generated and must not be edited by hand.

Work locally by default. Push to GitHub and publish only when the user explicitly requests it. Update this guide in the same task whenever the publishing workflow or hosting architecture changes.

1. Make the change in `source/`. Use the local dev server when the change affects layout or behavior.
2. Run `./scripts/publish.sh "Describe the site change"` from the repository root. For source changes, it builds the site and refreshes `public/`. It checks and commits the source, published files, and project documentation together, then pushes `main`. Documentation-only changes skip the build.
3. Check `https://lozhkin.cc/` after the hosting service updates. The checkout and GitHub match immediately after the push.

Run `cd source && pnpm test` when a change warrants the rendered-page checks. The publish command uses the build and static-output checks, so routine copy and spacing edits do not need an extra test pass.

The site is static. It has no database, preview password, or separate test-domain deployment. The former `card-portfolio` and `portfolio-site` folders are not part of this workflow.

The static-output check verifies the current Hero card stack and the expected project routes. The sync script copies every prerendered page to its `.html` path and a matching directory `index.html`, so direct project URLs resolve on the static host. Keep those checks aligned with the published site. Unpublished case drafts must stay outside this public repository.
