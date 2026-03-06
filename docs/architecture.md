# Architecture

Ekstra is a local-first motion platform with browser-facing developer surfaces.

## Browser Input Path

The simplest supported path today is the phone IMU browser flow:

```text
Phone Browser
  -> POST /api/phone-imu/ingest
  -> phone_imu_provider
  -> motiond
  -> ws_bridge
  -> Web App
```

In this mode, the web app subscribes to `motion.samples` and defines its own interaction behavior.

## Gesture and Action Path

Experiences that want higher-level gestures can add worker processes:

```text
motion.samples
  -> detection pipeline
  -> events.composition
  -> surface pack
  -> surface.actions
  -> Web App or connector
```

## Responsibilities By Layer

### Runtime layer

- provider ingest
- normalization
- event transport
- policy and routing

### Controls layer

- pointer behavior
- gesture interpretation defaults
- handedness and interaction tuning

### App layer

- UI
- domain actions
- product-specific workflows

## Current Public Sandbox Topology

The current hosted sandbox uses:

- one public frontdoor
- one public WebSocket bridge
- private internal runtime services

That is why public starters currently accept:

- `wsUrl`
- `controllerBase`
- `ingestUrl`

## Recommended Long-Term Topology

For production deployments, the cleanest public shape is:

```text
https://your-host.example/
https://your-host.example/ws
https://your-host.example/api/phone-imu/ingest
https://your-host.example/api/phone-imu/health
https://your-host.example/controller
```

That lets both the desktop page and the phone controller live behind a single public domain.
