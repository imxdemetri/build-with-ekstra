# Runtime Requirements

Any working Ekstra developer environment needs these runtime components:

## Required services

### `motiond`

The runtime daemon.
It accepts provider input and distributes motion events to clients and bridges.

### `ws_bridge`

Browser-facing WebSocket bridge.
Web apps should connect here, not directly to `motiond`.

### `phone_imu_provider`

HTTP ingest service for phone browser motion data.
This is the default no-download phone path.

### Frontdoor / reverse proxy

Recommended for:
- HTTPS
- one-origin browser and phone flows
- stable public URLs

## Recommended public URL shape

```text
https://your-host.example/
https://your-host.example/ws
https://your-host.example/api/phone-imu/ingest
https://your-host.example/api/phone-imu/health
https://your-host.example/controller
```

## Environment variables starter apps should expect

```text
EKSTRA_RUNTIME_WS_URL
EKSTRA_INGEST_URL
EKSTRA_CONTROLLER_URL
```
