# How To Deploy Ekstra to Your Own Server

This guide shows the practical self-hosted path for teams that want their own endpoints instead of the hosted sandbox.

The public Docker path is now real:

- the deployment manifests are public in this repo
- the runtime image is publicly pullable from GHCR

## What You Are Deploying

Minimum topology:

- `motiond`
- `ws_bridge`
- `phone_imu_provider`
- a frontdoor or reverse proxy

The public Docker assets live in:

- [`../deploy/docker/`](../deploy/docker/)

## Prerequisites

- Docker Desktop or Docker Engine
- a machine or VM that can expose HTTPS and WebSocket traffic
- a domain or subdomain for your deployment

## Quick Local Validation

From the repo root:

```powershell
docker compose -f deploy/docker/docker-compose.yml up -d
```

Or use the public validation script:

```powershell
powershell -ExecutionPolicy Bypass -File deploy/docker/validate-self-hosted.ps1
```

That validation checks:

- compose config validity
- frontdoor health
- phone ingest health
- TCP reachability for `motiond` and `ws_bridge`

## Use a Custom Runtime Image

If you want to validate against a different image or tag, set:

- `EKSTRA_IMAGE`
- `EKSTRA_TAG`

Example:

```powershell
$env:EKSTRA_IMAGE="ghcr.io/imxdemetri/ekstra-runtime"
$env:EKSTRA_TAG="latest"
docker compose -f deploy/docker/docker-compose.yml up -d
```

## Production Shape

Your browser app should expose these same logical endpoints:

- `/ws`
- `/api/phone-imu/ingest`
- `/api/phone-imu/health`
- a controller route for the phone page

For a clean deployment, keep them on one domain when possible.

Example:

```text
https://motion.example.com/ws
https://motion.example.com/api/phone-imu/ingest
https://motion.example.com/api/phone-imu/health
https://motion.example.com/controller
```

## Point a Starter at Your Server

Once your stack is live, override a starter locally:

```text
http://127.0.0.1:18080/index.html?wsUrl=wss%3A%2F%2Fmotion.example.com%2Fws&controllerBase=https%3A%2F%2Fmotion.example.com%2Fcontroller&ingestUrl=https%3A%2F%2Fmotion.example.com%2Fapi%2Fphone-imu%2Fingest
```

That lets you keep the public starter UI while using your own runtime.

## What To Verify Before Calling It Real

- the desktop page shows `ws: connected`
- the phone page reaches the health endpoint
- the phone `sent` counter increases
- the desktop sample counter increases
- reconnect works after a browser refresh

## Related Reading

- [`self-hosted-docker.md`](self-hosted-docker.md)
- [`deployment-modes.md`](deployment-modes.md)
- [`public-contract.md`](public-contract.md)
- [`../deploy/docker/README.md`](../deploy/docker/README.md)
