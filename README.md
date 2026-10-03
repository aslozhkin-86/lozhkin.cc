# Lozhkin PDP — personal portfolio website

This is the single source repository for [lozhkin.cc](https://lozhkin.cc/).

- `source/` contains the editable React, TypeScript, CSS, and image files.
- `public/` contains the generated site currently published at lozhkin.cc. Do not edit it by hand.
- A push to `main` that changes `source/` automatically rebuilds `public/` in GitHub Actions.

## Work locally

Requires Node.js 22.13 or newer and pnpm 11.19.0.

```sh
cd source
pnpm install
pnpm run dev
```

For a production build and a short rendered-page check:

```sh
pnpm test
```

## Publish

Commit and push edits under `source/` to `main`. GitHub Actions builds and commits the published files automatically. After it finishes, pull `main` to get the generated commit locally. See [docs/PUBLISHING.md](docs/PUBLISHING.md) for details.
