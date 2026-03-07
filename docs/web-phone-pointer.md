# Web Phone Pointer

`web-phone-pointer` is the first supported public Ekstra starter.

It demonstrates the full no-download browser flow:

- the desktop page is the product surface
- the phone controller runs in the browser
- motion is streamed into Ekstra over HTTPS
- the desktop page receives motion through the WebSocket bridge

## Intended Experience

- point the phone to move the cursor
- use the phone as a handheld motion controller
- scan a QR code instead of installing an app

## Support Level

`web-phone-pointer` is the primary supported public starter in the current preview.

That means:

- it is the main onboarding path described in this repo
- its browser wiring is part of the current public contract
- broader starters should be treated as preview or directional until they are shipped

## Files

- `starters/web-phone-pointer/index.html`
- `starters/web-phone-pointer/controller/index.html`
- `starters/web-phone-pointer/vendor/ekstra-motion-web.js`
- `starters/web-phone-pointer/detectors.json`

## Runtime Topics Used

- `motion.samples`
- `events.composition`
- `surface.actions`

## Current Health Signals

The starter should expose enough state to debug a first run without reading runtime logs.

On the desktop page you should see:

- WebSocket connection state
- live sample count
- last composition
- ingest health summary
- live debug state

On the phone page you should see:

- permission state
- motion and orientation event counters
- sent and failed post counts
- last post status
- last health status

## Supported Browsers

- desktop Chrome, Edge, and other modern Chromium browsers are the current easiest path
- iPhone Safari works when the controller is served over HTTPS and motion permission is granted from a user gesture
- Android browsers are generally more forgiving in development, but HTTPS is still the right deployment path

## Failure Modes To Expect

- if the phone controller cannot reach `/api/phone-imu/ingest`, the phone page will keep logging post failures
- if the desktop cannot reach `wss://ekstra.ai/ws`, the page will stay disconnected and the pointer will not move
- if the phone has not emitted motion events yet, centering and motion mapping will not work
- if the hosted sandbox is unavailable, the starter should be treated as unavailable rather than silently trusted

## Deterministic Troubleshooting

1. Open `https://ekstra.ai/build-with-ekstra/demo` and confirm the page loads.
2. Scan the QR code and confirm the phone page shows the current build tag.
3. Tap `Grant Motion Permission`.
4. Tap `Test Endpoint`.
5. Confirm the phone page shows `status=streaming` and increasing `sent`.
6. Confirm the desktop page shows `ws: connected` and increasing samples.
7. Only after those pass should you debug pointer tuning or click semantics.

## What Developers Usually Change

- the page layout and product UI
- the motion-to-pointer mapping
- click semantics
- action behavior and target selection

## What Developers Usually Keep

- phone pairing flow
- phone IMU ingest path
- browser bridge contract
- starter wiring to Ekstra endpoints

## Related Reading

- [`public-contract.md`](public-contract.md)
- [`support-status.md`](support-status.md)
- [`hosted-sandbox.md`](hosted-sandbox.md)
