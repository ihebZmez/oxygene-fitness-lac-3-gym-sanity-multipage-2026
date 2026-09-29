# Docker operations guide

This project builds a Vite/React app for production and runs the dev server with hot reload for local development.

## Requirements

- Docker Engine 24+
- Docker Compose v2
- Ports `0001` and `5173` available

## Production

Start the production build and serve the static site:

```bash
docker compose up --build -d
```

Open: http://localhost:0001

Useful commands:

```bash
docker compose ps
docker compose logs --tail=100 web
docker compose restart web
docker compose down
docker compose down --remove-orphans
```

Health check:

```bash
sh ./scripts/healthcheck.sh
sh ./scripts/healthcheck.sh http://localhost:0001/health
```

PowerShell:

```powershell
.\scripts\healthcheck.ps1
.\scripts\healthcheck.ps1 -Url http://localhost:0001/health
```

The app exposes `/health` and returns `ok` when running correctly.

## Development

Run the app with Vite hot reload:

```bash
docker compose -f compose.dev.yaml up --build
```

Open: http://localhost:5173

Stop it with:

```bash
docker compose -f compose.dev.yaml down
docker compose -f compose.dev.yaml down --volumes
```

## Common variables

| Variable   | Default | Purpose                  |
| ---------- | ------- | ------------------------ |
| `APP_PORT` | `0001`  | Production host port     |
| `DEV_PORT` | `5173`  | Development host port    |
| `ATTEMPTS` | `5`     | Health-check retry count |
| `DELAY`    | `2`     | Seconds between retries  |

## Quick deploy helper

```bash
sh ./scripts/deploy.sh
```

This builds the project, starts the container, and waits for the health check to pass.

## Troubleshooting

Check the rendered config:

```bash
docker compose config
docker compose -f compose.dev.yaml config
```

Inspect health status:

```bash
docker compose ps
docker inspect --format '{{json .State.Health}}' "$(docker compose ps -q web)"
```

If routes fail, rebuild the image and restart:

```bash
docker compose build --no-cache
docker compose up -d --force-recreate
```

For a full local reset:

```bash
docker compose down --rmi local --volumes
```
