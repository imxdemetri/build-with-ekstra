# Deployment Modes

Ekstra supports two public developer modes today.

## 1. Hosted Sandbox

Best for:

- first-run evaluations
- product design validation
- demos and lightweight prototypes
- teams that want to test motion UX before operating infrastructure

What Ekstra provides:

- browser-facing demo/frontdoor URL
- WebSocket bridge URL
- phone ingest and health endpoints

What you provide:

- your own front-end code
- a local static server or hosted web app
- a phone with a browser

Current public sandbox values are documented in [`hosted-sandbox.md`](hosted-sandbox.md).

## 2. Self-Hosted Docker

Best for:

- production pilots
- internal tools and private networks
- latency-sensitive experiences
- teams that need to own runtime topology and upgrades

Self-hosted requires:

- `motiond`
- `ws_bridge`
- `phone_imu_provider`
- a public-facing frontdoor or reverse proxy

See [`self-hosted-docker.md`](self-hosted-docker.md) and [`../deploy/docker/`](../deploy/docker/).

## Choosing the Right Mode

Use hosted sandbox if:

- you need to prove the interaction model quickly
- you are only changing front-end logic
- you do not yet need private infrastructure

Use self-hosted if:

- you need stable internal endpoints
- you are integrating additional providers or connectors
- you need environment control, logs, and deployment ownership

## What GitHub Does and Does Not Do

GitHub is used for:

- documentation
- starter code
- published browser package surface
- CI workflows
- Pages

GitHub is not the runtime host.

Ekstra runtime services must run on:

- Ekstra-hosted infrastructure
- your own machine
- your own Docker host or cloud environment
