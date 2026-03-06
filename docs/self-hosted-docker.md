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
