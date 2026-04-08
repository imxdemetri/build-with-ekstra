# Architecture

Ekstra is a platform for physical intelligence with multiple developer surfaces,
all accessed through `ekstra.ai`.

## Platform Overview

```
ekstra.ai
├── Platform API        /api/v1/*           Devices, auth, campaigns, network, map
├── Developer API       /api/developer/*    Projects, API keys, packages, deployments
├── Platform UI         /OS                 Canvas, map, Director AI chat
├── Runtime WebSocket   wss://ekstra.ai/ws  Real-time motion events
├── Phone IMU           /api/phone-imu/*    Phone orientation data ingest
└── Starters/Demos      /build-with-ekstra  Phone pointer, presentation remote
```

## Runtime Path (Motion)

The core motion path for browser developers:

```
Phone Browser
  → POST /api/phone-imu/ingest
  → phone_imu_provider
  → motiond (central motion daemon)
  → ws_bridge (WebSocket bridge)
  → Your Web App
```

## Gesture and Action Path

For higher-level gesture recognition:

```
motion.samples
  → detection pipeline (impulse, crossing, hold, tilt)
  → ML inference (ONNX models)
  → composition engine (gesture phrases)
  → surface routing (with safety controls)
  → Your App or connector
```

## Intelligence Layer

The Director is a conversational AI that combines 27 real-time data sources
(weather, transit, hazards, economic, news, mobility, and more).
Covers any global coordinate. Access via Platform UI or Director API.

## Developer Platform

Email-verified authentication, project management, API keys, package publishing.
Access via `ekstra.ai/api/developer/cloud/*`.

## Layers

| Layer | What It Does |
|-------|-------------|
| **Runtime** | Motion processing, detection, composition, routing |
| **Intelligence** | 27 data adapters, Director AI, metrics |
| **Platform** | Device registry, auth, campaigns, developer CP |
| **App** | Canvas, map, Director chat, device management |
| **Starters** | Phone pointer, presentation remote, self-hosted Docker |

## Deployment Modes

### Hosted sandbox
Uses the hosted runtime at `ekstra.ai`. Starters from localhost auto-connect.

### Self-hosted Docker
Full runtime stack via Docker Compose. See [`self-hosted-docker.md`](self-hosted-docker.md).

## For More

- [Platform API Reference](https://github.com/imxdemetri/ekstra-os/blob/motion-os-wave1-conformance/docs/developer/platform-api.md)
- [Director API Guide](https://github.com/imxdemetri/ekstra-os/blob/motion-os-wave1-conformance/docs/developer/director-api.md)
- [Runtime & SDK Guide](https://github.com/imxdemetri/ekstra-os/blob/motion-os-wave1-conformance/docs/developer/runtime-sdk.md)
- [Availability](https://github.com/imxdemetri/ekstra-os/blob/motion-os-wave1-conformance/docs/developer/availability.md)
