# Lozhkin PDP — personal portfolio website

This is the single project and Git repository for [lozhkin.cc](https://lozhkin.cc/).

- `source/` contains the editable React, TypeScript, CSS, and image files.
- `public/` contains the generated site served at lozhkin.cc. Do not edit it by hand.

## Work locally

Requires Node.js 22.13 or newer and pnpm 11.19.0.

```sh
cd source
pnpm install
pnpm run dev
```

## Publish

From the repository root, run one command after editing `source/`:

```sh
./scripts/publish.sh "Describe the site change"
```

The script builds the site, replaces `public/`, commits the source and generated files together, and pushes `main`. For the uncommon case where only the published files need rebuilding, append `--force`. See [docs/PUBLISHING.md](docs/PUBLISHING.md).
