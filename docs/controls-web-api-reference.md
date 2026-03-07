# `@ekstraai/controls-web` API Reference

This page defines the public TypeScript surface for `@ekstraai/controls-web`.

The stable contract in `0.1.0` applies to the supported profile surface:

- `pointer.basic`
- `pointer.precision`
- `presentation.remote`

Preview and experimental profiles are still exported, but they are not held to the same stability promise.

## Install

```bash
npm install @ekstraai/controls-web
```

## Module Entry Point

```ts
import {
  controlProfiles,
  supportedControlProfiles,
  previewControlProfiles,
  experimentalControlProfiles,
  getControlProfile,
  pointerBasic,
  pointerPrecision,
  presentationRemote,
} from "@ekstraai/controls-web";
```

## Exported Types

### `ClickMode`

```ts
type ClickMode = "runtime" | "gesture" | "wrist_snap";
```

Defines how confirmation or click-like behavior is modeled for a profile.

### `AxisMode`

```ts
type AxisMode = "tilt" | "yaw" | "roll" | "mixed";
```

Defines the dominant motion axis interpretation for a profile direction.

### `ProfileStability`

```ts
type ProfileStability = "supported" | "preview" | "experimental";
```

### `StarterAvailability`

```ts
type StarterAvailability = "supported" | "planned" | "none";
```

### `ControlProfile`

```ts
type ControlProfile = {
  id: string;
  title: string;
  description: string;
  category: "pointer" | "presentation" | "3d" | "kiosk" | "accessibility" | "media" | "document";
  stability: ProfileStability;
  starter: {
    slug: string | null;
    availability: StarterAvailability;
  };
  motionAxis: {
    horizontal: AxisMode;
    vertical: AxisMode;
  };
  clickMode: ClickMode;
  notes: string[];
};
```

## Exported Constants

### Supported profile constants

#### `pointerBasic`

```ts
import { pointerBasic } from "@ekstraai/controls-web";
```

Use for the primary browser pointer profile aligned with `web-phone-pointer`.

#### `pointerPrecision`

```ts
import { pointerPrecision } from "@ekstraai/controls-web";
```

Use for finer pointer-oriented browser interactions without a dedicated starter.

#### `presentationRemote`

```ts
import { presentationRemote } from "@ekstraai/controls-web";
```

Use for discrete command interactions aligned with `presentation-remote`.

### Aggregate collections

#### `controlProfiles`

```ts
const controlProfiles: readonly ControlProfile[];
```

All exported profile metadata, including supported, preview, and experimental.

#### `supportedControlProfiles`

```ts
const supportedControlProfiles: ControlProfile[];
```

Stable supported profile metadata.

#### `previewControlProfiles`

```ts
const previewControlProfiles: ControlProfile[];
```

Public preview profile metadata.

#### `experimentalControlProfiles`

```ts
const experimentalControlProfiles: ControlProfile[];
```

Directional or experimental profile metadata.

## Exported Functions

### `getControlProfile(id)`

```ts
function getControlProfile(id: string): ControlProfile | undefined;
```

Looks up a profile by its public ID.

Example:

```ts
import { getControlProfile } from "@ekstraai/controls-web";

const profile = getControlProfile("presentation.remote");

if (profile) {
  console.log(profile.id);
  console.log(profile.stability);
}
```

## Minimal Usage Patterns

### List stable supported profiles

```ts
import { supportedControlProfiles } from "@ekstraai/controls-web";

const stableIds = supportedControlProfiles.map((profile) => profile.id);
console.log(stableIds);
```

### Gate features by profile stability

```ts
import { getControlProfile } from "@ekstraai/controls-web";

const profile = getControlProfile("orbit.3d");

if (profile?.stability === "supported") {
  enableForGeneralUsers();
}
```

### Route a product to a known starter baseline

```ts
import { presentationRemote } from "@ekstraai/controls-web";

const starterSlug = presentationRemote.starter.slug;
console.log(starterSlug);
```

## Stability Boundary

Stable in `0.1.0`:

- exported supported profile constants
- exported aggregate helpers
- exported TypeScript types
- `getControlProfile(id)`

Not stable to the same degree:

- preview profiles
- experimental profiles
- any future starter-specific tuning fields not yet documented here

## Related Reading

- [`control-profiles.md`](control-profiles.md)
- [`support-status.md`](support-status.md)
- [`public-contract.md`](public-contract.md)
- [`../packages/controls-web/README.md`](../packages/controls-web/README.md)
