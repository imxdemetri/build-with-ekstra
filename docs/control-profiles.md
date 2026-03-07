# Control Profiles

Control profiles are the reusable interaction layer on top of the Ekstra runtime.

They answer questions such as:

- how should a phone steer a cursor?
- what motion should count as a click?
- what behavior is right for a presentation remote?
- how should 3D orbit feel compared with kiosk navigation?

## Why Profiles Matter

Not every product should interpret motion the same way.

Ekstra keeps the runtime stable and pushes product-specific interaction behavior into control profiles so developers can:

- reuse a profile
- fork a profile
- tune a profile for their product

## Public Profile Matrix

Profiles currently exposed in `@ekstra/controls-web`:

| Export | Profile ID | Status | Starter | Notes |
| --- | --- | --- | --- | --- |
| `pointerBasic` | `pointer.basic` | Supported | `web-phone-pointer` | Primary supported public profile |
| `pointerPrecision` | `pointer.precision` | Supported | none | Public metadata profile |
| `presentationRemote` | `presentation.remote` | Preview | planned | Starter not yet shipped |
| `orbit3d` | `orbit.3d` | Preview | planned | Starter not yet shipped |
| `kioskNav` | `kiosk.nav` | Preview | none | Public metadata profile |
| `mediaRemote` | `media.remote` | Preview | none | Public metadata profile |
| `accessibilityNav` | `accessibility.nav` | Experimental | none | Directional public metadata |
| `docScroll` | `doc.scroll` | Experimental | none | Directional public metadata |
| `modelInspect` | `model.inspect` | Experimental | none | Directional public metadata |
| `relaxedPointer` | `pointer.relaxed` | Experimental | none | Directional public metadata |

## Supported Versus Preview

Today:

- `pointer.basic` is the primary supported public control profile
- `pointer.precision` is publicly documented metadata, but does not yet have a dedicated starter
- `presentation.remote` and `orbit.3d` are exposed as preview profile definitions
- several additional profiles exist to show direction, not to imply finished public products

That means the safe claim is:

- the profile system is real
- the pointer wedge is supported
- broader profile coverage is public and typed, but not equally mature yet

## Package API

The current package exports:

- named profile constants
- `controlProfiles`
- `supportedControlProfiles`
- `previewControlProfiles`
- `experimentalControlProfiles`
- `getControlProfile(id)`

## Recommended Use

Use a control profile when you need a reusable starting point for:

- motion axis mapping
- click semantics
- interaction posture
- product-specific tuning conversations

Do not treat a profile definition by itself as a finished product starter.

## Related Reading

- [`support-status.md`](support-status.md)
- [`public-contract.md`](public-contract.md)
- [`../packages/controls-web/README.md`](../packages/controls-web/README.md)
