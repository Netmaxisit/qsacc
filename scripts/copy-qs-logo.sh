#!/usr/bin/env bash
set -euo pipefail
SRC="/Users/muhammadkhan/Downloads/drive-download-20260728T125701Z-1-001/QS logo.png"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cp "$SRC" "$ROOT/public/qs-logo.png"
node "$ROOT/scripts/generate-logo-assets.mjs"
echo "Logo updated in $ROOT/public/"
