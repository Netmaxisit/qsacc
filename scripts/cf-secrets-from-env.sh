#!/usr/bin/env bash
# Push secrets from local .env to the qsacc Worker (never commit .env).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ENV_FILE="${ROOT}/.env"

if [[ ! -f "$ENV_FILE" ]]; then
  echo "Missing .env — copy .env.example to .env and add your values."
  exit 1
fi

set -a
# shellcheck disable=SC1090
source "$ENV_FILE"
set +a

: "${GOOGLE_PLACES_API_KEY:?GOOGLE_PLACES_API_KEY not set in .env}"
: "${GOOGLE_PLACE_ID:?GOOGLE_PLACE_ID not set in .env}"

cd "$ROOT"
printf '%s' "$GOOGLE_PLACES_API_KEY" | npx wrangler secret put GOOGLE_PLACES_API_KEY
printf '%s' "$GOOGLE_PLACE_ID" | npx wrangler secret put GOOGLE_PLACE_ID

if [[ -n "${NTFY_BASE_URL:-}" ]]; then
  printf '%s' "$NTFY_BASE_URL" | npx wrangler secret put NTFY_BASE_URL
  echo "Uploaded NTFY_BASE_URL"
fi

if [[ -n "${NTFY_TOPIC:-}" ]]; then
  printf '%s' "$NTFY_TOPIC" | npx wrangler secret put NTFY_TOPIC
  echo "Uploaded NTFY_TOPIC"
fi

if [[ -n "${NTFY_TOKEN:-}" ]]; then
  printf '%s' "$NTFY_TOKEN" | npx wrangler secret put NTFY_TOKEN
  echo "Uploaded NTFY_TOKEN"
fi

echo "Worker secrets updated for qsacc."
