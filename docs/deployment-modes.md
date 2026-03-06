# Deployment Modes

## Hosted Sandbox

Best for:
- first-time developers
- demos
- quick integration trials

Required from Ekstra:
- runtime WebSocket URL
- phone ingest URL
- browser frontdoor URL

Developer app configuration:

```text
EKSTRA_RUNTIME_WS_URL=wss://example.ekstra.run/ws
EKSTRA_INGEST_URL=https://example.ekstra.run/api/phone-imu/ingest
EKSTRA_CONTROLLER_URL=https://example.ekstra.run/controller
```

## Self-hosted Docker

Best for:
- production pilots
- private data flows
- low-latency browser and device integration

Required services:
- `motiond`
- `ws_bridge`
- `phone_imu_provider`
- frontdoor or reverse proxy

See [`../deploy/docker/docker-compose.yml`](../deploy/docker/docker-compose.yml).

## What GitHub does and does not do

GitHub is used for:
- source
- docs
- CI
- package publishing
- container publishing

GitHub is not the runtime host.
The runtime must run on either:
- Ekstra-hosted infrastructure
- a developer machine
- a VM or cloud service with Docker
