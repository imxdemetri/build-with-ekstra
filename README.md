<p align="center">
  <img src="site/assets/ekstra-logo.png" alt="Ekstra logo" width="180" />
</p>

# Build with Ekstra

`build-with-ekstra` is the public developer starter repo for Ekstra.

Ekstra is a platform for physical intelligence — it connects sensors, screens, and devices into a shared network and provides tools for building motion-aware applications. This repository is the external-facing surface for getting started: docs, starters, reference integrations, and the browser control-profile package.

## What You Can Build Today

- browser experiences controlled by a phone with no native app install
- motion-aware websites and dashboards driven by real-time sensor data
- gesture-driven web interactions using the runtime composition engine
- location-aware applications powered by 27 real-time data adapters
- device-integrated products using the Platform API (devices, campaigns, screens)

## Start In 10 Minutes

1. Open the [live demo](https://ekstra.ai/build-with-ekstra/demo) on your laptop
2. Scan the QR code with your phone
3. Grant motion permission and tap Start
4. Move your phone — the cursor follows on your laptop screen

Clone and serve locally:

```bash
git clone https://github.com/imxdemetri/build-with-ekstra
cd build-with-ekstra/starters/web-phone-pointer
python3 -m http.server 8080
# Open http://localhost:8080
```

Start with [`docs/start-here.md`](docs/start-here.md) for the full flow.

## Platform Surfaces

Ekstra is one platform with multiple developer surfaces, all at `ekstra.ai`:

| Surface | URL | What It Does |
|---------|-----|-------------|
| **Platform UI** | [ekstra.ai/OS](https://ekstra.ai/OS) | Canvas, map, Director AI chat, device management |
| **Platform API** | ekstra.ai/api/v1/* | Device registry, auth, campaigns, network, map |
| **Developer API** | ekstra.ai/api/developer/cloud/* | Developer login (email-verified), projects, API keys, packages |
| **Runtime WebSocket** | wss://ekstra.ai/ws | Real-time motion events |
| **Director** | Via Platform UI or API | Conversational AI with 27 live data sources |
| **Starters** | This repo | Phone pointer, presentation remote, npm package, Docker |

## Developer Platform

Ekstra has a full developer platform with email-verified authentication:

1. **Login** — `POST /api/developer/cloud/login` with your email
2. **Verify** — Click the link in your email to get a session token
3. **Build** — Create projects, generate API keys, publish packages

See the [Developer Quickstart](https://github.com/imxdemetri/ekstra-os/blob/motion-os-wave1-conformance/docs/developer/quickstart.md) for the full flow.

## Live Public Surfaces

- Live demo: `https://ekstra.ai/build-with-ekstra/demo`
- Presentation remote: `https://ekstra.ai/build-with-ekstra/presentation-remote`
- Phone controller: `https://ekstra.ai/build-with-ekstra/controller`
- WebSocket bridge: `wss://ekstra.ai/ws`
- Phone ingest: `https://ekstra.ai/api/phone-imu/ingest`

## Latest Package Release

```bash
npm install @ekstraai/controls-web
```

10 control profiles: pointer.basic, pointer.precision, pointer.relaxed, presentation.remote,
orbit.3d, kiosk.nav, media.remote, accessibility.nav, doc.scroll, model.inspect.

API reference: [`docs/controls-web-api-reference.md`](docs/controls-web-api-reference.md)

## Supported Deployment Modes

### Hosted sandbox

Best for:
- first-time developers
- design validation
- demos and prototype integrations

### Self-hosted Docker

Best for:
- production pilots
- private networks
- custom providers and connectors
- tighter operational control

Current status:
- deployment assets are public
- runtime image is publicly pullable from GHCR

Use [`deploy/docker/`](deploy/docker/) for self-hosted runtime deployment.

## Repository Layout

```text
docs/                  External-facing documentation
starters/              Supported starter apps
packages/controls-web/ Browser control-profile package
examples/reference/    Reference integrations
deploy/docker/         Self-hosted runtime deployment manifests
site/                  GitHub Pages landing site
.github/workflows/     Public repo CI and publishing workflows
```

## Documentation

**Getting started:**
- [`docs/start-here.md`](docs/start-here.md)
- [`docs/architecture.md`](docs/architecture.md)
- [`docs/concepts.md`](docs/concepts.md)

**Starters:**
- [`docs/web-phone-pointer.md`](docs/web-phone-pointer.md)
- [`docs/presentation-remote.md`](docs/presentation-remote.md)

**Reference:**
- [`docs/controls-web-api-reference.md`](docs/controls-web-api-reference.md)
- [`docs/public-contract.md`](docs/public-contract.md)
- [`docs/support-status.md`](docs/support-status.md)

**Deployment:**
- [`docs/hosted-sandbox.md`](docs/hosted-sandbox.md)
- [`docs/self-hosted-docker.md`](docs/self-hosted-docker.md)

**Full developer documentation:**
- [Platform API Reference](https://github.com/imxdemetri/ekstra-os/blob/motion-os-wave1-conformance/docs/developer/platform-api.md)
- [Director API Guide](https://github.com/imxdemetri/ekstra-os/blob/motion-os-wave1-conformance/docs/developer/director-api.md)
- [Runtime & SDK Guide](https://github.com/imxdemetri/ekstra-os/blob/motion-os-wave1-conformance/docs/developer/runtime-sdk.md)
- [Developer Quickstart](https://github.com/imxdemetri/ekstra-os/blob/motion-os-wave1-conformance/docs/developer/quickstart.md)
- [Availability](https://github.com/imxdemetri/ekstra-os/blob/motion-os-wave1-conformance/docs/developer/availability.md)

## Community and Support

- License: `Apache-2.0` via [`LICENSE`](LICENSE)
- Email: `info@ekstra.ai`
- Telegram: `https://t.me/ekstraai`
- X: `https://x.com/ekstraai`

## Status

Ekstra is in early public developer preview. The hosted sandbox is for evaluation and prototyping. The developer platform uses email-verified authentication. The current supported surface includes phone pointer and presentation remote starters, the @ekstraai/controls-web npm package, the Platform API, the Developer API, and the Director intelligence layer.

