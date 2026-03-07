# Hosted Sandbox

The hosted sandbox is the fastest way to build with Ekstra today.

It is intended for:

- developer onboarding
- design validation
- prototype integrations

It is not yet positioned as a production-grade hosted service.

## What Is Publicly Supported In The Sandbox

For the current preview, the supported browser-facing pieces are:

- the `ekstra.ai/build-with-ekstra` landing and demo routes
- the WebSocket bridge at `wss://ekstra.ai/ws`
- the phone IMU ingest and health endpoints
- the `web-phone-pointer` starter flow

For exact payloads and topic shapes, see [`public-contract.md`](public-contract.md).

## Current Public Endpoints

- developer landing: `https://ekstra.ai/build-with-ekstra`
- live demo: `https://ekstra.ai/build-with-ekstra/demo`
- WebSocket bridge: `wss://ekstra.ai/ws`
- phone controller: `https://ekstra.ai/build-with-ekstra/controller`
- phone ingest: `https://ekstra.ai/api/phone-imu/ingest`
- phone health: `https://ekstra.ai/api/phone-imu/health`

## What The Sandbox Includes

- `motiond`
- `ws_bridge`
- `phone_imu_provider`
- detection pipeline for the phone pointer demo
- surface pack worker for the phone pointer demo
- a public frontdoor service

## Recommended Integration Pattern

For the first integration:

1. validate the hosted demo at `https://ekstra.ai/build-with-ekstra/demo`
2. serve your front-end locally
3. connect to the hosted WebSocket bridge
4. use the hosted phone controller and ingest path
5. iterate on your app logic before self-hosting

## Current Guarantees

Today the hosted sandbox provides:

- HTTPS browser and phone endpoints
- a live browser event stream for the public starter flow
- a current reference implementation for evaluation and prototyping

It does not currently provide:

- uptime or latency SLA commitments
- durable event replay guarantees through the browser bridge
- production tenant isolation or regulated-workload assurances
- stability guarantees for undocumented topics or fields

## Important Limitations

- shared environment
- no SLA
- public evaluation endpoints may change over time
- the sandbox should be treated as a preview environment, not production infrastructure
- self-hosting is still the right path for serious pilots or sensitive workloads

## Example Starter URLs

Simplest evaluation URL:

```text
https://ekstra.ai/build-with-ekstra/demo
```

Local starter against the hosted sandbox:

```text
http://127.0.0.1:18080/index.html
```

Supported starters automatically point at the hosted `ekstra.ai` sandbox when served from `localhost` or `127.0.0.1`.
