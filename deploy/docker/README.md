# Self-hosted Docker

This folder defines the target self-hosted runtime shape for public developers.

## Required published images

Before this path works, publish container images for:
- `ghcr.io/imxdemetri/ekstra-motiond`
- `ghcr.io/imxdemetri/ekstra-ws-bridge`
- `ghcr.io/imxdemetri/ekstra-phone-imu-provider`
- `ghcr.io/imxdemetri/ekstra-frontdoor`

## What this deployment gives a developer

- browser-facing HTTPS endpoint
- phone ingest endpoint
- browser WebSocket bridge
- single origin for demos and starters

## Recommended deployment target

For the first production-style deployment, use:
- one Ubuntu VM
- Docker Compose
- Caddy for HTTPS

GitHub Pages is for docs only.
