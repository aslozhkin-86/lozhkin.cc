# Publishing lozhkin.cc

The GitHub repository `aslozhkin-86/lozhkin.cc` is the only project repository. Edit files under `source/`. The `public/` folder is generated and must not be edited by hand.

1. Make the change in `source/`. Use the local dev server when the change affects layout or behavior.
2. Run `./scripts/publish.sh "Describe the site change"` from the repository root. It builds the site, refreshes `public/`, checks the generated output, commits the source and published files together, and pushes `main`.
3. Check `https://lozhkin.cc/` after the hosting service updates. The checkout and GitHub match immediately after the push.

Run `cd source && pnpm test` when a change warrants the rendered-page checks. The publish command uses the build and static-output checks, so routine copy and spacing edits do not need an extra test pass.

The site is static. It has no database, preview password, or separate test-domain deployment. The former `card-portfolio` and `portfolio-site` folders are not part of this workflow.
