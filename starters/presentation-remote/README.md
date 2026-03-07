# Presentation Remote Starter

`presentation-remote` is the second public Ekstra starter.

It demonstrates a different interaction pattern than the pointer demo:

- phone motion becomes discrete presentation commands instead of a live cursor
- quick left and right wrist roll moves through the deck
- pitch can reveal or hide speaker notes
- the page still uses the same hosted browser bridge and phone controller flow

## Status

Current state: supported starter for evaluation and prototyping.

## Fastest Live Check

Serve the starter locally:

```powershell
cd starters\presentation-remote
python -m http.server 18081
```

Then open:

```text
http://127.0.0.1:18081/index.html
```

## Runtime Inputs

This starter can be configured with three query parameters:

- `wsUrl`
- `controllerBase`
- `ingestUrl`

If you serve it from `localhost` or `127.0.0.1`, it defaults to the hosted `ekstra.ai` sandbox automatically.

## Included Files

- `index.html`
- `controller/index.html`
- `vendor/ekstra-motion-web.js`

## Expected Health Signals

Desktop page:

- `ws: connected`
- sample counter increasing
- current slide changes when you roll the phone decisively
- debug panel shows `ingestHealth`

Phone page:

- `status=streaming`
- `sent` increasing
- `motionEvents` increasing

## Control Model

- quick right wrist roll: next slide
- quick left wrist roll: previous slide
- pitch down from neutral: reveal notes
- return toward neutral: hide notes
- `Center Remote`: reset the neutral hold angle

This is a starter, not a required presentation behavior. Most teams will keep the runtime wiring and replace the deck, notes, and motion semantics with their own product behavior.
