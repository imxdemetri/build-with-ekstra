# Self-hosted Docker

This folder defines the target self-hosted runtime shape for public developers.

Current public status:

- the manifests in this folder are public
- the runtime image access path is still preview-grade until the GHCR package is opened for anonymous pulls
- if the image is private in your environment, run `docker login ghcr.io` before compose bring-up
- you can override the image source locally with `EKSTRA_IMAGE` and `EKSTRA_TAG`

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

## Before you run it

- install Docker Desktop or Docker Engine
- confirm the Docker daemon is actually running
- authenticate to GHCR if your image visibility requires it

The fastest local bring-up is:

```powershell
docker compose -f deploy/docker/docker-compose.yml up -d
```

After startup, verify the browser-facing surface and phone ingest endpoint before opening a starter.

## Local Validation Before Publish

You can validate the public compose path against a local or custom runtime image without changing the manifests:

```powershell
powershell -ExecutionPolicy Bypass -File deploy/docker/validate-self-hosted.ps1
```

To validate against a locally built runtime image from a private checkout:

```powershell
powershell -ExecutionPolicy Bypass -File deploy/docker/validate-self-hosted.ps1 `
  -LocalBuildRepo C:\path\to\ekstra-os `
  -Image ekstra-runtime-local `
  -Tag latest
```
