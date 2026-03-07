<p align="center">
  <img src="site/assets/ekstra-logo.png" alt="Ekstra logo" width="180" />
</p>

# Build with Ekstra

`build-with-ekstra` is the public developer starter repo for Ekstra.OS.

Ekstra lets developers add motion-native input to web products using phones, cameras, XR devices, and other motion providers. This repository is the external-facing surface for getting started: docs, supported starters, reference integrations, and the browser control-profile package.

It is not the full internal runtime source tree.

## What You Can Build Today

- browser experiences controlled by a phone with no native app install
- motion-aware websites and dashboards driven by `motion.samples`
- gesture-driven web interactions built on top of Ekstra composition and routing
- reusable control profiles such as pointer, presentation, kiosk, and 3D navigation modes

## Start In 10 Minutes

The fastest path is the hosted sandbox.

1. Clone this repo.
2. Serve [`starters/web-phone-pointer/`](starters/web-phone-pointer/).
3. Point the starter at the hosted Ekstra sandbox.
4. Open the page in a browser, scan the QR code, and use your phone as an input device.

Quickstart:

```powershell
git clone https://github.com/imxdemetri/build-with-ekstra
cd build-with-ekstra\starters\web-phone-pointer
python -m http.server 8080
```

Then open:

```text
http://127.0.0.1:8080/index.html?wsUrl=wss%3A%2F%2Fekstra.ai%2Fws&controllerBase=https%3A%2F%2Fekstra.ai%2Fbuild-with-ekstra%2Fcontroller&ingestUrl=https%3A%2F%2Fekstra.ai%2Fapi%2Fphone-imu%2Fingest
```

Start with [`docs/start-here.md`](docs/start-here.md) for the full flow.

## Live Public Surfaces

- Developer landing: `https://ekstra.ai/build-with-ekstra`
- Live demo: `https://ekstra.ai/build-with-ekstra/demo`
- Phone controller: `https://ekstra.ai/build-with-ekstra/controller`
- Hosted WebSocket bridge: `wss://ekstra.ai/ws`
- Phone ingest: `https://ekstra.ai/api/phone-imu/ingest`
- GitHub wiki: `https://github.com/imxdemetri/build-with-ekstra/wiki`
- GitHub project board: `https://github.com/users/imxdemetri/projects/1`

## Available Now vs Planned

Available now:
- hosted sandbox runtime for evaluation and prototype work
- `web-phone-pointer` starter
- `@ekstra/controls-web` package scaffold
- public docs, GitHub Pages, and wiki

Planned next:
- `presentation-remote` starter
- `orbit-3d` starter
- broader control-profile coverage and published npm package releases

## Platform Model

Ekstra is one platform with multiple developer surfaces:

- `Ekstra Runtime`
  - the motion OS layer that ingests, normalizes, routes, and distributes motion data
- `Ekstra Controls`
  - reusable control profiles such as pointer, presentation, and 3D navigation
- `Starters`
  - reference application slices developers can copy and adapt

For browser developers, the important runtime path is:

```text
Phone browser -> phone_imu_provider -> motiond -> ws_bridge -> your web app
```

Optional higher-level gesture routing adds:

```text
motion.samples -> detection pipeline -> events.composition -> surface pack -> surface.actions
```

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

- [`docs/README.md`](docs/README.md)
- [`docs/start-here.md`](docs/start-here.md)
- [`docs/concepts.md`](docs/concepts.md)
- [`docs/architecture.md`](docs/architecture.md)
- [`docs/hosted-sandbox.md`](docs/hosted-sandbox.md)
- [`docs/self-hosted-docker.md`](docs/self-hosted-docker.md)
- [`docs/control-profiles.md`](docs/control-profiles.md)
- [`docs/web-phone-pointer.md`](docs/web-phone-pointer.md)
- [`docs/faq.md`](docs/faq.md)

## Community and Support

- Support: [`SUPPORT.md`](SUPPORT.md)
- Security policy: [`SECURITY.md`](SECURITY.md)
- Contribution guide: [`CONTRIBUTING.md`](CONTRIBUTING.md)
- Telegram: `https://t.me/ekstraai`
- X: `https://x.com/ekstraai`
- Discord: coming soon

## Status

Ekstra is currently in early public developer preview. The hosted sandbox is intended for evaluation and prototyping, not for production SLA commitments.
