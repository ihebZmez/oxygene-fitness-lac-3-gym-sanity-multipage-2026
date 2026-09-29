#!/usr/bin/env sh
set -eu

echo "Building and starting the production container..."
docker compose up --build --detach --remove-orphans

echo "Waiting for the container health check..."
container="$(docker compose ps -q web)"
attempts=0
while [ "$attempts" -lt 15 ]; do
  status="$(docker inspect --format '{{.State.Health.Status}}' "$container" 2>/dev/null || true)"
  case "$status" in
    healthy)
      echo "Deployment ready at http://localhost:${APP_PORT:-0001}"
      exit 0
      ;;
    unhealthy)
      docker compose logs --tail=50 web
      echo "Deployment failed health checks." >&2
      exit 1
      ;;
  esac
  attempts=$((attempts + 1))
  sleep 2
done

docker compose ps
echo "Container started but did not become healthy in time." >&2
exit 1