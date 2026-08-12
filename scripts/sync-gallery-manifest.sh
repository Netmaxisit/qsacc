#!/usr/bin/env bash
# Regenerate src/data/gallery-files.json from public/gallery (jpg/png/webp only).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
GALLERY="$ROOT/public/gallery"
OUT="$ROOT/src/data/gallery-files.json"

if [[ ! -d "$GALLERY" ]]; then
  echo '[]' > "$OUT"
  echo "No public/gallery — wrote empty manifest."
  exit 0
fi

node -e "
const fs = require('fs');
const path = require('path');
const dir = process.argv[1];
const ext = /\.(jpe?g|png|webp)$/i;
const files = fs.readdirSync(dir)
  .filter((n) => ext.test(n) && !n.startsWith('.'))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
fs.writeFileSync(process.argv[2], JSON.stringify(files, null, 2) + '\n');
" "$GALLERY" "$OUT"

echo "Updated manifest ($(wc -l < "$OUT" | tr -d ' ') lines): $OUT"
cat "$OUT"
