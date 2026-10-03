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

if [[ -z "$(git status --porcelain -- source)" && "${2:-}" != "--force" ]]; then
  echo "No source changes to publish. Add --force to rebuild anyway."
  exit 0
fi

(cd source && pnpm run build)
node scripts/sync-static.mjs
git add -A source public
git diff --cached --check -- source public
if git diff --cached --quiet -- source public; then
  echo "No site changes to publish."
  exit 0
fi
git commit -m "$message" -- source public
git push origin main
