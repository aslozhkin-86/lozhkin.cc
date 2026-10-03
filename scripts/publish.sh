#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

if [[ "$(git branch --show-current)" != "main" ]]; then
  echo "Publish from the main branch." >&2
  exit 1
fi

message="${1:-}"
if [[ -z "$message" ]]; then
  echo 'Usage: ./scripts/publish.sh "Describe the site change"' >&2
  exit 1
fi

if [[ -n "$(git status --porcelain -- source)" || "${2:-}" == "--force" ]]; then
  (cd source && pnpm run build)
  node scripts/sync-static.mjs
fi

git add -A AGENTS.md README.md docs scripts source public
git diff --cached --check -- AGENTS.md README.md docs scripts source public
if git diff --cached --quiet -- AGENTS.md README.md docs scripts source public; then
  echo "No site changes to publish."
  exit 0
fi
git commit -m "$message" -- AGENTS.md README.md docs scripts source public
git push origin main
