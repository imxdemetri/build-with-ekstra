# Self-Hosted Docker

Self-hosting is the recommended path once you move beyond prototype evaluation.

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

After the services are healthy, point a supported starter at your self-hosted WebSocket bridge, phone controller, and ingest endpoint.

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
