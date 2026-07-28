#!/usr/bin/env bash
set -euo pipefail
DEST="$(cd "$(dirname "$0")/.." && pwd)/public/qs-icon.png"
for SRC in \
  "/Users/muhammadkhan/Documents/Projects/QSolve/QS-icon.png" \
  "/Users/muhammadkhan/Desktop/QS-icon.png"
do
  if cp "$SRC" "$DEST" 2>/dev/null; then
    echo "Copied $SRC → $DEST ($(wc -c < "$DEST") bytes)"
    exit 0
  fi
done
echo "Could not read QS-icon.png. Copy manually:" >&2
echo "  cp \"/path/to/QS-icon.png\" \"$DEST\"" >&2
exit 1
