# Architecture

Ekstra is a platform for physical intelligence with multiple developer surfaces,
all accessed through `ekstra.ai`.

## Platform Overview

```
ekstra.ai
â”œâ”€â”€ Platform API        /api/v1/*           Devices, auth, campaigns, network, map
â”œâ”€â”€ Developer API       /api/developer/*    Projects, API keys, packages, deployments
â”œâ”€â”€ Platform UI         /OS                 Canvas, map, Director AI chat
â”œâ”€â”€ Runtime WebSocket   wss://ekstra.ai/ws/events  Real-time motion events
â”œâ”€â”€ Phone IMU           /api/phone-imu/*    Phone orientation data ingest
â””â”€â”€ Starters/Demos      /build-with-ekstra  Phone pointer, presentation remote
```

## Runtime Path (Motion)

The core motion path for browser developers:

```
Phone Browser
  â†’ POST /api/phone-imu/ingest
  â†’ phone_imu_provider
  â†’ motiond (central motion daemon)
  â†’ ws_bridge (WebSocket bridge)
  â†’ Your Web App
```

## Gesture and Action Path

For higher-level gesture recognition:

```
motion.samples
  â†’ detection pipeline (impulse, crossing, hold, tilt)
  â†’ ML inference (ONNX models)
  â†’ composition engine (gesture phrases)
  â†’ surface routing (with safety controls)
  â†’ Your App or connector
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
