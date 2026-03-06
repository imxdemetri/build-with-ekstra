# Self-hosted Docker

This folder defines the target self-hosted runtime shape for public developers.

## Required published image

Before this path works, publish:
- `ghcr.io/imxdemetri/ekstra-runtime`

The first public deployment uses one shared runtime image with different service start commands.

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
