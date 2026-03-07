# Public Contract

This page defines the browser-facing contract currently supported by `build-with-ekstra`.

It is the document a developer should read before wiring Ekstra into a real product.

## Contract Version

- current public contract: `0.1`
- release phase: `public developer preview`
- contract source of truth:
  - this document
  - the `@ekstraai/controls-web` package source in this repo
  - [`CHANGELOG.md`](../CHANGELOG.md)

For the public preview, breaking changes to documented surfaces should be called out in the changelog before they are reflected in the hosted sandbox and starter docs.

## In Scope

This public contract covers:

- hosted sandbox endpoints under `ekstra.ai`
- the browser WebSocket bridge message format
- the phone IMU ingest endpoint used by the public starter
- the topic and payload shapes consumed by `web-phone-pointer`
- the exported metadata surface of `@ekstraai/controls-web`

This public contract does not cover:

- the full private runtime protocol
- admin APIs
- provider SDK internals
- unpublished internal modalities or packs

## Hosted Preview Endpoints

The current hosted preview endpoints are:

- developer landing: `https://ekstra.ai/build-with-ekstra`
- live reference demo: `https://ekstra.ai/build-with-ekstra/demo`
- phone controller: `https://ekstra.ai/build-with-ekstra/controller`
- browser bridge: `wss://ekstra.ai/ws`
- phone IMU ingest: `https://ekstra.ai/api/phone-imu/ingest`
- phone IMU health: `https://ekstra.ai/api/phone-imu/health`

These endpoints are intended for onboarding, evaluation, and prototype work. They are not an SLA-backed production service.

## Browser WebSocket Contract

### Connection

Clients connect to:

```text
wss://ekstra.ai/ws
```

The bridge sends JSON messages over WebSocket.

### Server Message Types

The bridge may send these message types:

- `ready`
- `event`
- `ack`
- `error`
- `pong`

Example `ready` frame:

```json
{
  "runtime_host": "127.0.0.1",
  "runtime_port": 8765,
  "subscribed_topic": "*",
  "type": "ready"
}
```

Example `event` frame:

```json
{
  "event": {
    "actor_id": "actor-1",
    "confidence": 0.95,
    "frame": "device:phone-imu",
    "metadata": {
      "provider": "phone_imu",
      "raw_euler_deg": {
        "alpha": 182.4,
        "beta": -6.2,
        "gamma": 11.7
      },
      "signal_type": "motion"
    },
    "orientation": [0.01, 0.09, 0.99, 0.04],
    "part": "device.handheld",
    "source_clock": "unix_ms",
    "source_timestamp": 1741305600123,
    "timestamp": 18425.912,
    "velocity": [0.0, 0.02, -0.01]
  },
  "topic": "motion.samples",
  "type": "event"
}
```

Example publish `ack` frame:

```json
{
  "ack": null,
  "ref_type": "publish",
  "type": "ack"
}
```

Example `error` frame:

```json
{
  "message": "publish_requires_topic_and_event",
  "type": "error"
}
```

### Client Message Types

The public browser bridge currently accepts:

- `ping`
- `publish`

Example `ping`:

```json
{
  "type": "ping"
}
```

Example `publish`:

```json
{
  "type": "publish",
  "topic": "control.surface.focus",
  "event": {
    "actor_id": "actor-1",
    "surface_id": "surface:web-pointer-demo",
    "timestamp": 18426.104
  }
}
```

### Ordering and Delivery Expectations

- frames are delivered to a given browser connection in the order the bridge receives them from the runtime
- the browser bridge should be treated as a live event stream, not a durable ledger
- reconnects can introduce gaps in observation
- clients should tolerate disconnects and reconnect without assuming exactly-once delivery
- a publish `ack` means the bridge accepted the request and the runtime returned successfully
- a publish `ack` does not mean a downstream surface action was executed

## Public Topics

The current public starter and browser package rely on these topics:

### Browser-consumed topics

- `motion.samples`
- `events.composition`
- `surface.actions`

### Browser-published control topics

- `control.surface.focus`
- `control.surface.clutch`
- `control.surface.confirm`

### Topic Envelopes

All runtime-originated browser events use the same outer envelope:

```json
{
  "type": "event",
  "topic": "topic.name",
  "event": {}
}
```

## Payload Shapes

### `motion.samples`

Expected event shape:

- `actor_id: string`
- `part: string`
- `frame: string`
- `timestamp: number`
- `confidence: number`
- `source_timestamp?: number`
- `source_clock?: string`
- `position?: [number, number, number]`
- `velocity?: [number, number, number]`
- `orientation?: [number, number, number, number]`
- `angular_velocity?: [number, number, number]`
- `metadata?: object`

### `events.composition`

Expected event shape:

- `composition_type: string`
- `actor_id: string`
- `part: string`
- `frame: string`
- `timestamp: number`
- `confidence: number`
- `source_timestamp?: number`
- `source_clock?: string`
- `start_timestamp?: number`
- `end_timestamp?: number`
- `attributes?: object`

Example:

```json
{
  "composition_type": "click_flick",
  "actor_id": "actor-1",
  "part": "device.handheld",
  "frame": "device:phone-imu",
  "timestamp": 18430.225,
  "confidence": 0.91,
  "attributes": {
    "axis": "gamma",
    "direction": "inward"
  }
}
```

### `surface.actions`

Expected event shape:

- `action_id: string`
- `actor_id: string`
- `surface_id: string`
- `intent: string`
- `timestamp: number`
- `confidence: number`
- `payload?: object`
- `requires_focus?: boolean`
- `requires_clutch?: boolean`
- `requires_confirmation?: boolean`
- `qos?: string`
- `debounce_seconds?: number`

Example:

```json
{
  "action_id": "action-01",
  "actor_id": "actor-1",
  "surface_id": "surface:web-pointer-demo",
  "intent": "pointer.click",
  "timestamp": 18430.226,
  "confidence": 0.91,
  "payload": {
    "button": "primary",
    "target": "timeline"
  },
  "requires_focus": true,
  "requires_clutch": false,
  "requires_confirmation": false,
  "qos": "idempotent",
  "debounce_seconds": 0.15
}
```

### Published control events

`control.surface.focus`:

```json
{
  "actor_id": "actor-1",
  "surface_id": "surface:web-pointer-demo",
  "timestamp": 18431.0
}
```

`control.surface.clutch`:

```json
{
  "actor_id": "actor-1",
  "engaged": true,
  "timestamp": 18431.2
}
```

`control.surface.confirm`:

```json
{
  "actor_id": "actor-1",
  "token": "confirm-123",
  "timestamp": 18431.4
}
```

## Phone IMU Ingest Contract

### Endpoint

```text
POST https://ekstra.ai/api/phone-imu/ingest
```

`Content-Type` must be `application/json`.

Expected request shape:

```json
{
  "source_timestamp_ms": 1741305600123,
  "alpha": 182.4,
  "beta": -6.2,
  "gamma": 11.7,
  "accel_x": 0.01,
  "accel_y": -0.13,
  "accel_z": 9.74,
  "gyro_x": 0.2,
  "gyro_y": -1.8,
  "gyro_z": 4.1,
  "confidence": 0.95
}
```

Successful response:

```json
{
  "status": "ingested"
}
```

Error response:

```json
{
  "detail": "bad_request detail here",
  "error": "bad_request"
}
```

Health endpoint:

```text
GET https://ekstra.ai/api/phone-imu/health
```

Example health response:

```json
{
  "actor_id": "actor-1",
  "ingest_count": 493,
  "last_error": null,
  "provider_id": "phone-imu",
  "status": "ok",
  "topic": "motion.samples"
}
```

## Actor and Surface Model

- `actor_id` identifies the current human or interaction lane
- `surface_id` scopes control and focus to a specific product surface
- the public starter defaults to `actor-1` and `surface:web-pointer-demo`
- production integrations should set their own actor and surface identifiers explicitly

## `@ekstraai/controls-web` Contract

The public package contract is currently:

- typed profile metadata
- named profile exports
- aggregate profile lookup helpers

It is not yet a full motion runtime SDK.

Current public package docs:

- [`docs/control-profiles.md`](control-profiles.md)
- [`packages/controls-web/README.md`](../packages/controls-web/README.md)

## Compatibility Policy

For the current preview:

- the hosted browser event envelope documented here is the compatibility target
- undocumented topics or fields may change without notice
- supported starter wiring and supported package exports should only change with changelog coverage
- preview and experimental surfaces may evolve more quickly than supported ones

## Related Reading

- [`support-status.md`](support-status.md)
- [`hosted-sandbox.md`](hosted-sandbox.md)
- [`web-phone-pointer.md`](web-phone-pointer.md)

