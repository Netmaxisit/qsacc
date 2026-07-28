#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DEST="$ROOT/public/gallery"
mkdir -p "$DEST"

copy_from() {
  local SRC="$1"
  shopt -s nullglob
  local copied=0
  for f in "$SRC"/*.{jpg,JPG,jpeg,JPEG,png,PNG,webp,WEBP}; do
    base="$(basename "$f")"
    cp "$f" "$DEST/$base"
    copied=$((copied + 1))
  done
  if [ -f "$SRC/10.jpg" ]; then
    cp "$SRC/10.jpg" "$DEST/10.jpg"
  elif [ -f "$SRC/10.JPG" ]; then
    cp "$SRC/10.JPG" "$DEST/10.jpg"
  fi
  echo "$copied"
}

for SRC in \
  "$ROOT/gallery-source" \
  "/Users/muhammadkhan/Downloads/drive-download-20260728T125701Z-1-001" \
  "$HOME/Downloads/drive-download-20260728T125701Z-1-001"
do
  if [ -d "$SRC" ]; then
    n="$(copy_from "$SRC")"
    if [ -n "$(ls -A "$DEST" 2>/dev/null)" ]; then
      echo "Copied $n file(s) from $SRC → $DEST"
      ls -la "$DEST"
      exit 0
    fi
  fi
done

echo "No gallery images copied." >&2
echo "" >&2
echo "Option A — drag your photo folder into the project as:" >&2
echo "  $ROOT/gallery-source/" >&2
echo "Then run this script again." >&2
echo "" >&2
echo "Option B — copy manually:" >&2
echo "  cp \"/path/to/your/photos/\"*.jpg \"$DEST/\"" >&2
exit 1
