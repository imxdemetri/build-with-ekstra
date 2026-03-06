# Hosted Sandbox

The hosted sandbox is the fastest way to build with Ekstra today.

It is intended for:

- developer onboarding
- design validation
- prototype integrations

It is not yet positioned as a production-grade hosted service.

## Current Public Endpoints

- frontdoor: `https://frontdoor-production.up.railway.app/`
- WebSocket bridge: `wss://wsbridge-production-2ec6.up.railway.app/ws`
- phone controller: `https://frontdoor-production.up.railway.app/examples/phone_imu_controller/index.html`
- phone ingest: `https://frontdoor-production.up.railway.app/api/phone-imu/ingest`
- phone health: `https://frontdoor-production.up.railway.app/api/phone-imu/health`

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
http://127.0.0.1:8080/index.html?wsUrl=wss%3A%2F%2Fwsbridge-production-2ec6.up.railway.app%2Fws&controllerBase=https%3A%2F%2Ffrontdoor-production.up.railway.app%2Fexamples%2Fphone_imu_controller%2Findex.html&ingestUrl=https%3A%2F%2Ffrontdoor-production.up.railway.app%2Fapi%2Fphone-imu%2Fingest
```
