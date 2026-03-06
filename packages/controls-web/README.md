# `@ekstra/controls-web`

`@ekstra/controls-web` is the browser control-profile package for Ekstra-powered web experiences.

It defines reusable interaction defaults for motion-driven products such as:

- pointers
- presentation remotes
- kiosk navigation
- document scroll
- model inspection

## Current Profiles

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

## What This Package Is

This package contains:

- control-profile metadata
- profile defaults
- a stable import surface for browser integrations

## What This Package Is Not

This package does not replace:

- the Ekstra runtime
- the browser bridge
- the phone IMU ingest service

It is intended to sit on top of the runtime and help developers standardize motion interaction behavior in their own products.
