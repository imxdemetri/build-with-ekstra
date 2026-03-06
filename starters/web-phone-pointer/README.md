# Web Phone Pointer Starter

Status: first public starter lane

Purpose:
- browser page controlled by a phone
- tilt for pointer motion
- wrist snap and related gestures for clicks and actions

Runtime requirements:
- `wsUrl`
- `controllerBase`
- `ingestUrl`

Included files:
- `index.html`
- `controller/index.html`
- `vendor/ekstra-motion-web.js`
- `detectors.json`

Example hosted URL shape:

```text
https://sandbox.ekstra.run/starters/web-phone-pointer/index.html?wsUrl=wss%3A%2F%2Fyour-ws-bridge.up.railway.app%2Fws&controllerBase=https%3A%2F%2Fsandbox.ekstra.run%2Fstarters%2Fweb-phone-pointer%2Fcontroller%2Findex.html&ingestUrl=https%3A%2F%2Fsandbox.ekstra.run%2Fapi%2Fphone-imu%2Fingest
```
