# Publishing lozhkin.cc

The GitHub repository `aslozhkin-86/lozhkin.cc` is the only project repository. Edit files under `source/`. The `public/` folder is generated; do not edit it by hand.

1. In `source/`, run `pnpm test` for changes that affect rendering or behavior. For a copy or spacing edit, a local preview and build are sufficient.
2. Commit the source change and push `main`.
3. The `Build and publish portfolio` GitHub Action installs dependencies, builds the site, refreshes `public/`, and pushes a generated commit. Check that the Action succeeds and that `https://lozhkin.cc/` shows the change.
4. Pull `main` locally to receive the generated commit. This keeps the local checkout aligned with GitHub.

The site is static. It has no database, preview password, or separate test-domain deployment. The former `card-portfolio` and `portfolio-site` folders are not part of this workflow.
