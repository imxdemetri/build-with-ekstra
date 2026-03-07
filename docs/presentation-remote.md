# Presentation Remote

`presentation-remote` is the second public Ekstra starter.

It exists to prove that the same browser runtime path can power a different interaction model than pointer control.

## What It Demonstrates

- phone browser as a no-download handheld remote
- motion samples consumed in a desktop browser over the hosted bridge
- discrete commands instead of continuous pointer travel
- speaker-note reveal on top of the same runtime path

## Runtime Path

```text
Phone browser -> phone_imu_provider -> motiond -> ws_bridge -> presentation app
```

## Default Interaction Model

- quick right wrist roll: next slide
- quick left wrist roll: previous slide
- pitch down from neutral: reveal notes
- return toward neutral: hide notes
- recenter at any time with `Center Remote`

This is a starter control model, not a universal presentation UX.

## Why It Matters

The point is not slide decks by themselves. The point is public proof that:

- the hosted browser contract is reusable
- Ekstra supports more than one interaction pattern
- the runtime layer and the product behavior layer remain separate

## Starter Files

- `starters/presentation-remote/index.html`
- `starters/presentation-remote/controller/index.html`
- `starters/presentation-remote/vendor/ekstra-motion-web.js`

## First Run

Serve the starter locally:

```powershell
cd starters\presentation-remote
python -m http.server 8080
```

Then open:

```text
http://127.0.0.1:8080/index.html?wsUrl=wss%3A%2F%2Fekstra.ai%2Fws&controllerBase=https%3A%2F%2Fekstra.ai%2Fbuild-with-ekstra%2Fcontroller&ingestUrl=https%3A%2F%2Fekstra.ai%2Fapi%2Fphone-imu%2Fingest
```

## Read Next

- [`public-contract.md`](public-contract.md)
- [`support-status.md`](support-status.md)
- [`control-profiles.md`](control-profiles.md)
