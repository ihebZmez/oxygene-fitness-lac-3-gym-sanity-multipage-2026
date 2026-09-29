# Deployment

Docker deployment and monitoring commands are kept in [README_DOCKER.md](README_DOCKER.md).

## Production

```bash
docker compose up --build -d
```

Open: http://localhost:0001

The container exposes `/health` and restarts automatically unless stopped.

## Development

```bash
docker compose -f compose.dev.yaml up --build
```

Open: http://localhost:5173

## Helper script

```bash
sh ./scripts/deploy.sh
```

This command builds the app, starts the container, and waits for a healthy response.
