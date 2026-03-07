# `@ekstra/controls-web`

`@ekstra/controls-web` is the public browser control-profile package for Ekstra-powered web experiences.

It currently exposes typed profile metadata, named exports, and lookup helpers for motion-driven browser interaction modes.

## Current Package Status

- package surface: `public preview`
- source is public in this repo
- first npm release is being prepared
- supported profiles today: `pointer.basic` and `presentation.remote`

This package is not yet a full runtime SDK. It sits above the runtime and helps developers standardize control behavior in browser products.

## What The Package Exports

- named profile exports such as `pointerBasic` and `presentationRemote`
- `controlProfiles`
- `supportedControlProfiles`
- `previewControlProfiles`
- `experimentalControlProfiles`
- `getControlProfile(id)`

## Example

```ts
import {
  controlProfiles,
  getControlProfile,
  pointerBasic,
  supportedControlProfiles,
} from "@ekstra/controls-web";

console.log(pointerBasic.id);
console.log(supportedControlProfiles.map((profile) => profile.id));
console.log(getControlProfile("presentation.remote")?.stability);
console.log(controlProfiles.length);
```

## Profile Status Matrix

| Profile | Status | Starter availability | Notes |
| --- | --- | --- | --- |
| `pointer.basic` | Supported | `web-phone-pointer` | Primary public control profile |
| `pointer.precision` | Supported | none | Public metadata profile |
| `presentation.remote` | Supported | `presentation-remote` | Public starter for discrete deck navigation |
| `orbit.3d` | Preview | planned | Public metadata, starter not shipped yet |
| `kiosk.nav` | Preview | none | Public metadata |
| `media.remote` | Preview | none | Public metadata |
| `accessibility.nav` | Experimental | none | Directional public metadata |
| `doc.scroll` | Experimental | none | Directional public metadata |
| `model.inspect` | Experimental | none | Directional public metadata |
| `pointer.relaxed` | Experimental | none | Directional public metadata |

## Control Profile Shape

Each profile currently includes:

- `id`
- `title`
- `description`
- `category`
- `stability`
- `starter`
- `motionAxis`
- `clickMode`
- `notes`

## What This Package Is

This package contains:

- reusable profile metadata
- public support semantics for each profile
- a typed import surface for browser integrations

## What This Package Is Not

This package does not replace:

- the Ekstra runtime
- the browser bridge
- the phone IMU ingest service
- starter application code

For runtime contracts, see:

- [`../../docs/public-contract.md`](../../docs/public-contract.md)
- [`../../docs/support-status.md`](../../docs/support-status.md)
