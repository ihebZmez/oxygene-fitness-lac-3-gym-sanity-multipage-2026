#!/usr/bin/env sh
set -eu

URL="${1:-http://localhost:${APP_PORT:-0001}/health}"
ATTEMPTS="${ATTEMPTS:-5}"
DELAY="${DELAY:-2}"

if ! command -v curl >/dev/null 2>&1; then
  echo "curl is required to run the health check." >&2
  exit 2
fi

i=1
while [ "$i" -le "$ATTEMPTS" ]; do
  if curl --fail --silent --show-error --max-time 5 "$URL" >/dev/null; then
    echo "Healthy: $URL"
    exit 0
  fi
  echo "Health check attempt $i/$ATTEMPTS failed: $URL" >&2
  i=$((i + 1))
  [ "$i" -le "$ATTEMPTS" ] && sleep "$DELAY"
done

echo "Unhealthy: $URL" >&2
exit 1