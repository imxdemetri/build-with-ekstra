# Control Profiles

Control profiles are the reusable interaction layer on top of the Ekstra runtime.

They answer questions such as:

- how should a phone steer a cursor?
- what motion should count as a click?
- what behavior is right for a presentation remote?
- how should 3D orbit feel compared with kiosk navigation?

## Current Public Profile Catalog

Profiles currently exposed in `@ekstra/controls-web`:

- `pointerBasic`
- `pointerPrecision`
- `presentationRemote`
- `orbit3d`
- `kioskNav`
- `mediaRemote`
- `accessibilityNav`
- `docScroll`
- `modelInspect`
- `relaxedPointer`

## Why Profiles Matter

Not every product should interpret motion the same way.

Ekstra keeps the runtime stable and pushes product-specific interaction behavior into control profiles so developers can:

- reuse a profile
- fork a profile
- tune a profile for their product

## Current Guidance

Today:

- `web-phone-pointer` is the primary supported starter
- `presentation-remote` and `orbit-3d` are roadmap-facing public starters
- `@ekstra/controls-web` is the place where broader profile coverage will stabilize
