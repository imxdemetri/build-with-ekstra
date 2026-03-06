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

## Files

- `starters/web-phone-pointer/index.html`
- `starters/web-phone-pointer/controller/index.html`
- `starters/web-phone-pointer/vendor/ekstra-motion-web.js`
- `starters/web-phone-pointer/detectors.json`

## Runtime Topics Used

- `motion.samples`
- `events.composition`
- `surface.actions`

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
