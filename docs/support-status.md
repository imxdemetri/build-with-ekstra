# Support Status

This page separates what is publicly supported today from what is public preview, directional, or still internal.

That distinction matters because the internal Ekstra platform is broader than the current public developer wedge.

## Status Definitions

- `Supported`
  - part of the current public developer path
  - documented as a current interface
  - expected to receive compatibility notes before breaking changes
- `Preview`
  - public and usable, but not yet a stable external dependency or starter
  - shape may still move as the public surface hardens
- `Directional`
  - described because it is part of the platform direction
  - not yet a supported public build target in this repo
- `Internal`
  - implemented or explored in the broader Ekstra platform
  - not yet part of this public developer surface

## Public Surface Matrix

| Surface | Status | Notes |
| --- | --- | --- |
| Hosted sandbox at `ekstra.ai` | Supported | Current evaluation path for browser developers |
| Same-domain hosted starter routes at `ekstra.ai/build-with-ekstra/*` | Supported | Pointer and presentation remote are both live |
| Browser bridge contract at `wss://ekstra.ai/ws` | Supported | See [`public-contract.md`](public-contract.md) |
| Phone IMU ingest at `https://ekstra.ai/api/phone-imu/ingest` | Supported | Current no-download onboarding path |
| `web-phone-pointer` starter | Supported | Primary public starter |
| `presentation-remote` starter | Supported | Second public starter proving a discrete command pattern |
| Self-hosted Docker deployment assets | Supported | Public GHCR runtime image and validated self-hosted compose path are available |
| `@ekstraai/controls-web` metadata API | Supported | Stable package is published for the supported profile surface; broader profile metadata remains preview or experimental |
| `pointer.basic` profile | Supported | Primary profile for current starter |
| `pointer.precision` profile | Supported | Public profile metadata, no dedicated starter yet |
| `presentation.remote` profile | Supported | Backed by a public starter |
| `orbit.3d` profile | Preview | Public profile metadata, starter not shipped yet |
| `kiosk.nav` profile | Preview | Public profile metadata |
| `media.remote` profile | Preview | Public profile metadata |
| `accessibility.nav` profile | Experimental | Directional profile metadata, not yet a supported starter |
| `doc.scroll` profile | Experimental | Directional profile metadata |
| `model.inspect` profile | Experimental | Directional profile metadata |
| `relaxed.pointer` profile | Experimental | Directional profile metadata |
| `orbit-3d` starter | Directional | Planned next public starter |

## Modality Coverage

| Modality | Public Status | Notes |
| --- | --- | --- |
| Phone IMU in browser | Supported | Primary public onboarding path |
| Browser-consumed motion stream | Supported | Current wedge for web developers |
| Camera-based motion | Internal | Part of the broader platform, not yet the public onboarding path in this repo |
| XR motion providers | Internal | Broader platform capability, not yet this repo's public starter path |
| CSI and ambient motion sensing | Internal / exploratory | Part of long-term platform direction, not yet a public developer starter |

## What A Developer Can Rely On Today

If you are building now, the safe public contract is:

- use the hosted browser bridge and phone IMU ingest endpoints
- build on top of `motion.samples`, `events.composition`, and `surface.actions`
- start from `web-phone-pointer` or `presentation-remote`
- treat additional profiles as reusable metadata, not as finished starters

## What To Avoid Assuming

Do not assume:

- every profile already has a polished starter
- every modality described in the wiki is part of this repo's public onboarding path
- the hosted sandbox is the production service shape
- undocumented topics or payload fields are stable

## Related Reading

- [`public-contract.md`](public-contract.md)
- [`control-profiles.md`](control-profiles.md)
- [`hosted-sandbox.md`](hosted-sandbox.md)

