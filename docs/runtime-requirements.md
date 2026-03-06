# Runtime Requirements

Any working Ekstra deployment needs a small runtime topology behind the developer-facing app.

## Required Services

### `motiond`

The runtime daemon.

Responsibilities:

- accepts provider input
- applies runtime policy
- fans out events to subscribers
- exposes the core transport contract used by bridges and worker processes

### `ws_bridge`

The browser-facing WebSocket bridge.

Responsibilities:

- subscribes to runtime topics
- delivers runtime events to browser clients over WebSocket
- optionally accepts browser-originated publish requests

Browser applications should connect here, not directly to `motiond`.

### `phone_imu_provider`

The default no-download phone ingest path.

Responsibilities:

- accepts HTTP POSTs from a phone browser
- converts deviceorientation/devicemotion into normalized `MotionSample`s
- publishes those samples into `motiond`

### Frontdoor / reverse proxy

Recommended for:

- HTTPS termination
- one public origin for browser and phone flows
- clean public endpoint layout
- CORS simplification

## Optional Worker Processes

Some experiences operate directly on `motion.samples`.

Others also need:

- a detection pipeline
- a surface pack worker

Those workers subscribe to runtime events and publish higher-level topics such as:

- `events.composition`
- `surface.actions`

## Recommended Public URL Shape

```text
https://your-host.example/
https://your-host.example/ws
https://your-host.example/api/phone-imu/ingest
https://your-host.example/api/phone-imu/health
https://your-host.example/controller
```

Ekstra’s current public sandbox uses a separate WebSocket bridge domain, so starters accept explicit query parameters for `wsUrl`, `controllerBase`, and `ingestUrl`.

## Starter Configuration Contract

At minimum, a browser starter should know:

```text
EKSTRA_RUNTIME_WS_URL
EKSTRA_INGEST_URL
EKSTRA_CONTROLLER_URL
```

For static starters in this repo, those values are passed as query parameters rather than environment variables.
