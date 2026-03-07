# Hosted Sandbox

The hosted sandbox is the fastest way to build with Ekstra today.

It is intended for:

- developer onboarding
- design validation
- prototype integrations

It is not yet positioned as a production-grade hosted service.

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

1. serve your front-end locally
2. connect to the hosted WebSocket bridge
3. use the hosted phone controller and ingest path
4. iterate on your app logic before self-hosting

## Important Limitations

- shared environment
- no SLA
- public evaluation endpoints may change over time
- current browser starters use explicit query parameters because the frontdoor and WebSocket bridge are on separate public Railway domains

## Example Starter URL

```text
http://127.0.0.1:8080/index.html?wsUrl=wss%3A%2F%2Fekstra.ai%2Fws&controllerBase=https%3A%2F%2Fekstra.ai%2Fbuild-with-ekstra%2Fcontroller&ingestUrl=https%3A%2F%2Fekstra.ai%2Fapi%2Fphone-imu%2Fingest
```
