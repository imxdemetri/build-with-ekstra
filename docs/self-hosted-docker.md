# Self-Hosted Docker

Self-hosting is the recommended path once you move beyond prototype evaluation.

Current public status:

- deployment manifests are public in this repo
- the runtime image is publicly pullable from GHCR
- treat self-hosted Docker as the serious deployment path, not the first-run onboarding wedge
- the compose path can be validated against a local or custom runtime image before any public image publish

## Use Self-Hosted When

- you need stable private endpoints
- you need local or regional control over latency
- you need custom runtime workers or providers
- you are preparing a pilot or internal deployment

## Minimum Runtime Topology

- `motiond`
- `ws_bridge`
- `phone_imu_provider`
- frontdoor / reverse proxy

Optional:

- detection pipeline
- surface pack worker

## Deployment Assets

See:

- [`../deploy/docker/`](../deploy/docker/)
- [`../../deploy/docker/README.md`](../../deploy/docker/README.md)

## First Bring-Up

Make sure Docker Desktop or Docker Engine is installed and the daemon is running before you start. Then bring the stack up with:

```powershell
docker compose -f deploy/docker/docker-compose.yml up -d
```

If you want to validate the compose path against a local runtime image before relying on GHCR, run:

```powershell
powershell -ExecutionPolicy Bypass -File deploy/docker/validate-self-hosted.ps1 `
  -LocalBuildRepo C:\path\to\ekstra-os `
  -Image ekstra-runtime-local `
  -Tag latest
```

After the services are healthy, point a supported starter at your self-hosted WebSocket bridge, phone controller, and ingest endpoint.

If `docker compose` fails before containers start, check these two things first:

- Docker Desktop or Docker Engine is actually running
- your machine can reach `ghcr.io`

You can also override the runtime image directly with:

- `EKSTRA_IMAGE`
- `EKSTRA_TAG`

That makes it possible to validate the public manifests against a private or locally built image without editing the compose file.

## Operational Expectations

Production-minded self-hosted setups should provide:

- HTTPS
- WebSocket support
- internal private networking between services
- logs and restart policies
- environment-specific endpoint configuration

## Browser Contract

Your browser app still expects the same logical endpoints:

- WebSocket bridge
- phone controller
- phone ingest

The difference is that your team owns the deployment and URLs.
