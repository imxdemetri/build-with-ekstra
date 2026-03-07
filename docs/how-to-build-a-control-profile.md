# How To Build a Custom Control Profile

This guide explains how to define a product-specific control profile without pretending it is a new runtime contract.

In Ekstra, a control profile is metadata that describes how a product expects motion to behave:

- which motion axes matter
- what click or confirmation style it uses
- whether there is a starter baseline
- whether it is supported, preview, or experimental

The public package for this surface is:

```bash
npm install @ekstraai/controls-web
```

## Start From the Stable Shape

The exported `ControlProfile` type is the stable contract:

```ts
import type { ControlProfile } from "@ekstraai/controls-web";
```

A profile includes:

- `id`
- `title`
- `description`
- `category`
- `stability`
- `starter`
- `motionAxis`
- `clickMode`
- `notes`

See [`controls-web-api-reference.md`](controls-web-api-reference.md) for the full type details.

## Start From an Existing Public Profile

The easiest path is to extend one of the supported profiles and override what is different for your product.

```ts
import {
  pointerBasic,
  type ControlProfile,
} from "@ekstraai/controls-web";

export const reviewRemote: ControlProfile = {
  ...pointerBasic,
  id: "review.remote",
  title: "Review Remote",
  description: "Discrete review controls for approvals and sign-off flows.",
  category: "presentation",
  stability: "preview",
  starter: {
    slug: null,
    availability: "none",
  },
  motionAxis: {
    horizontal: "yaw",
    vertical: "tilt",
  },
  clickMode: "gesture",
  notes: [
    "Optimized for next, previous, and confirm actions.",
    "Keep actor-scoped state in the browser app.",
  ],
};
```

## How To Think About Stability

Use `supported` only when all of these are true:

- you are prepared to keep the profile ID stable
- you have a public starter or integration that proves the behavior
- you are willing to document and version it like a real public surface

Use `preview` when:

- the profile is real but still moving
- it may still change based on developer feedback

Use `experimental` when:

- the profile is directional
- there is no support promise yet

## What a Profile Should Not Do

A control profile should not:

- replace runtime normalization
- become a detector implementation
- hardcode browser transport logic
- claim platform-wide support before a starter proves it

Profiles describe interaction semantics. They do not replace provider adapters, runtime routing, or product UI.

## Where To Keep Product-Specific Profiles

For a product team, the cleanest pattern is:

- stable shared profiles from `@ekstraai/controls-web`
- local product-specific profiles in your own repo

That keeps your app flexible without forcing every experiment into the public package.

## Recommended Workflow

1. Start from `pointer.basic`, `pointer.precision`, or `presentation.remote`.
2. Copy the profile into your app repo.
3. Rename the profile ID to your product-specific ID.
4. Tune axis and click semantics to match the real interaction.
5. Keep it `preview` until a public starter or product slice proves it.

## Related Reading

- [`controls-web-api-reference.md`](controls-web-api-reference.md)
- [`control-profiles.md`](control-profiles.md)
- [`support-status.md`](support-status.md)
- [`../packages/controls-web/README.md`](../packages/controls-web/README.md)
