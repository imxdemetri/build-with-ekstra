# Web Phone Pointer Starter

`web-phone-pointer` is the first supported public starter in the Ekstra developer surface.

It demonstrates the full browser-first motion flow:

- a desktop web page subscribes to `motion.samples`
- a phone browser streams IMU data without a native app
- the page maps phone motion into cursor movement and click behavior

## Status

Current state: supported starter for evaluation and prototyping.

This is the primary supported public starter in the current preview.

## Runtime Inputs

This starter can be configured with three query parameters:

- `wsUrl`
- `controllerBase`
- `ingestUrl`

If you serve it from `localhost` or `127.0.0.1`, it will default to the hosted `ekstra.ai` sandbox automatically.

## Fastest Live Check

Use the hosted reference flow first:

```text
https://ekstra.ai/build-with-ekstra/demo
```

## Included Files

- `index.html`
- `controller/index.html`
- `vendor/ekstra-motion-web.js`
- `detectors.json`

## Recommended First Run

Serve the directory locally:

```powershell
cd starters\web-phone-pointer
python -m http.server 18080
```

Then open:

```text
http://127.0.0.1:18080/index.html
```

## Expected Health Signals

Desktop page:

- `ws: connected`
- sample counter increasing
- debug panel shows `ingestHealth`

Phone page:

- `status=streaming`
- `sent` increasing
- `motionEvents` increasing

## Browser Notes

- iPhone Safari generally requires HTTPS before motion permission can be granted
- desktop and phone should be tested on the same live flow before customizing
- if the phone streams but the cursor does not move, inspect the desktop debug panel first

## What To Change First

Most developers should keep the runtime wiring and replace:

- the demo UI
- the cursor logic
- the click semantics
- the target interaction model

This is a starter, not a required product behavior.
