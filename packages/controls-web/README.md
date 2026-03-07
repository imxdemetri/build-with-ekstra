# `@ekstraai/controls-web`

`@ekstraai/controls-web` is the public browser control-profile package for Ekstra-powered web experiences.

It currently exposes typed profile metadata, named exports, and lookup helpers for motion-driven browser interaction modes.

## Current Package Status

- package surface: `public preview`
- source is public in this repo
- first npm preview release is published on npm
- supported profiles today: `pointer.basic`, `pointer.precision`, and `presentation.remote`

This package is not yet a full runtime SDK. It sits above the runtime and helps developers standardize control behavior in browser products.

## What You Can Do With It Today

Use this package to:

- discover which public profiles are currently supported
- bind your UI or starter selection to stable profile IDs
- surface starter and motion-shape metadata in your own browser app
- keep profile naming and support semantics aligned with the public Ekstra repo

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
  getControlProfile,
  supportedControlProfiles,
} from "@ekstraai/controls-web";

const supportedIds = supportedControlProfiles.map((profile) => profile.id);
const profile = getControlProfile("presentation.remote");

if (supportedIds.includes("presentation.remote") && profile) {
  console.log(profile.id);
  console.log(profile.title);
  console.log(profile.stability);
  console.log(profile.starter?.slug);
  console.log(profile.motionAxis);
}
```

In practice, this means you can:

- list the profiles your product is willing to expose
- gate features on `supported` versus `preview`
- choose the right public starter as a baseline for a given interaction mode

## Install

The current public preview release is published on npm.

```bash
npm install @ekstraai/controls-web@preview
```

This package is published as a preview release and should still be treated as a narrow, browser-focused public surface.

## Supported Profiles Today

### `pointer.basic`

Use when:

- you want a general browser pointer profile
- your product starts from the public `web-phone-pointer` starter
- wrist-snap click is acceptable for confirmation

Current shape:

| Field | Value |
| --- | --- |
| `id` | `pointer.basic` |
| `stability` | `supported` |
| `starter.slug` | `web-phone-pointer` |
| `starter.availability` | `supported` |
| `motionAxis.horizontal` | `mixed` |
| `motionAxis.vertical` | `tilt` |
| `clickMode` | `wrist_snap` |

Example:

```ts
import { pointerBasic } from "@ekstraai/controls-web";

console.log(pointerBasic.id);
console.log(pointerBasic.motionAxis.horizontal);
console.log(pointerBasic.clickMode);
```

### `pointer.precision`

Use when:

- you need smaller-target browser interactions
- you want a calmer pointer profile than the default pointer starter
- you are tuning dashboard or form-like experiences

Current shape:

| Field | Value |
| --- | --- |
| `id` | `pointer.precision` |
| `stability` | `supported` |
| `starter.slug` | `null` |
| `starter.availability` | `none` |
| `motionAxis.horizontal` | `yaw` |
| `motionAxis.vertical` | `tilt` |
| `clickMode` | `wrist_snap` |

Example:

```ts
import { pointerPrecision } from "@ekstraai/controls-web";

console.log(pointerPrecision.id);
console.log(pointerPrecision.starter.availability);
console.log(pointerPrecision.notes);
```

### `presentation.remote`

Use when:

- your product needs discrete next/previous style commands
- you want a phone to behave more like a handheld remote than a cursor
- you are building decks, meeting controls, or room media navigation

Current shape:

| Field | Value |
| --- | --- |
| `id` | `presentation.remote` |
| `stability` | `supported` |
| `starter.slug` | `presentation-remote` |
| `starter.availability` | `supported` |
| `motionAxis.horizontal` | `yaw` |
| `motionAxis.vertical` | `tilt` |
| `clickMode` | `gesture` |

Example:

```ts
import { presentationRemote } from "@ekstraai/controls-web";

console.log(presentationRemote.id);
console.log(presentationRemote.starter.slug);
console.log(presentationRemote.motionAxis);
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

For package release steps, see:

- [`./RELEASING.md`](./RELEASING.md)

