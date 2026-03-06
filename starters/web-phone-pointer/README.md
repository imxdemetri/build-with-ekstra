# Web Phone Pointer Starter

`web-phone-pointer` is the first supported public starter in the Ekstra developer surface.

It demonstrates the full browser-first motion flow:

- a desktop web page subscribes to `motion.samples`
- a phone browser streams IMU data without a native app
- the page maps phone motion into cursor movement and click behavior

## Status

Current state: supported starter for evaluation and prototyping.

## Runtime Inputs

This starter expects three query parameters:

- `wsUrl`
- `controllerBase`
- `ingestUrl`

## Included Files

- `index.html`
- `controller/index.html`
- `vendor/ekstra-motion-web.js`
- `detectors.json`

## Recommended First Run

Serve the directory locally:

```powershell
cd starters\web-phone-pointer
python -m http.server 8080
```

Then open:

```text
http://127.0.0.1:8080/index.html?wsUrl=wss%3A%2F%2Fwsbridge-production-2ec6.up.railway.app%2Fws&controllerBase=https%3A%2F%2Ffrontdoor-production.up.railway.app%2Fexamples%2Fphone_imu_controller%2Findex.html&ingestUrl=https%3A%2F%2Ffrontdoor-production.up.railway.app%2Fapi%2Fphone-imu%2Fingest
```

## What To Change First

Most developers should keep the runtime wiring and replace:

- the demo UI
- the cursor logic
- the click semantics
- the target interaction model

This is a starter, not a required product behavior.
