# Build with Ekstra

Public developer starters and reference integrations for Ekstra.OS.

This repository is the public onboarding surface for developers who want to build with Ekstra today.
It does not contain the full internal Ekstra runtime source tree.

What this repo is for:
- public docs
- supported starter apps
- reference examples
- web control profile package
- deployment manifests for self-hosted runtime

What still needs to run somewhere:
- `motiond`
- `ws_bridge`
- `phone_imu_provider`
- a frontdoor or reverse proxy for browser + phone traffic

You have two supported developer modes:

1. Hosted sandbox
- fastest path
- Ekstra runs the runtime services
- developers point their apps at hosted URLs

2. Self-hosted Docker
- best for serious integration work
- developers run the runtime services locally or on their own VM
- use the manifests in [`deploy/docker/`](deploy/docker/)

## Start Here

Read these in order:
- [`docs/start-here.md`](docs/start-here.md)
- [`docs/deployment-modes.md`](docs/deployment-modes.md)
- [`docs/runtime-requirements.md`](docs/runtime-requirements.md)

## Repo Layout

```text
docs/                  Public docs and onboarding
starters/              Supported app starters
packages/controls-web/ Web control profile package
examples/reference/    Reference apps and integrations
deploy/docker/         Self-hosted runtime deployment manifests
.github/workflows/     Public repo CI
```

## Current Launch Tracks

- `web-phone-pointer`
- `presentation-remote`
- `orbit-3d`
- `kiosk-nav`
- `media-remote`
- `accessibility-nav`
- `doc-scroll`
- `model-inspect`
- `relaxed-pointer`
- `pointer-precision`

These are control profiles and starter experiences built on top of the Ekstra runtime.
They are not the runtime itself.

## Current Requirement

For developers to build today, one of these must exist:
- hosted Ekstra runtime endpoints
- published Ekstra runtime container images

Until runtime images are published, the hosted sandbox path is the default public onboarding lane.

## Publishing Surfaces

- GitHub Pages: docs and public landing site
- npm: `@ekstra/controls-web`
- GHCR: Ekstra runtime images
- Railway: hosted sandbox runtime
