# Lozhkin PDP — personal portfolio website

This is the single project and Git repository for [lozhkin.cc](https://lozhkin.cc/).

- `source/` contains the editable React, TypeScript, CSS, and image files.
- `source/styles/tokens.css` contains the shared color and typography system for the homepage and project pages.
- `public/` contains the generated site served at lozhkin.cc. Do not edit it by hand.

## Work locally

Requires Node.js 22.13 or newer and pnpm 11.19.0.

```sh
cd source
pnpm install
pnpm run dev
```

The unpublished Playground source is archived locally at `/Users/alex/Documents/Lozhkin PDP/site-unpublished/playground/`. To work on it, copy it to `source/app/playground/` before starting the local server, and restore its Vision preview from `site-unpublished/playground-assets/projects/birmarket/vision-2027.png` to `source/public/projects/birmarket/`. Move the route back out and remove that preview asset before publishing; the publish script blocks the route while it is in the source tree.

## Site agent team

Open Codex with this repository as the primary project folder. `AGENTS.md` defines the workflow; `.codex/agents/` defines Dev (production implementation), Tim (Playground maintenance, testing, and design-system consistency), Al (motion review), and Wipe (Notion data, synchronization, and website content review). Al reads `docs/MOTION_RULES.md` and the project-local animation review skills. For example: “Ask Dev to implement this change, then have Tim update the Playground if needed and test the real site, Al review any changed animation, and Wipe check changed content against its sources. Address their findings before reporting completion.”

Dev also has the project-local `figma-create-design-system-rules` skill for requests to create or refine Figma-to-code rules. Everyday site changes still use the existing components and tokens; Tim reviews any proposed shared-system additions.

## Publish

From the repository root, run one command after editing `source/`:

```sh
./scripts/publish.sh "Describe the site change"
```

The script builds the site, replaces `public/`, commits the source and generated files together, and pushes `main`. For the uncommon case where only the published files need rebuilding, append `--force`. See [docs/PUBLISHING.md](docs/PUBLISHING.md).
