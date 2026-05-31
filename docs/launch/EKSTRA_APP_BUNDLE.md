# Ekstra App Bundle

Date: 2026-05-23

This launch bundle is capability-based. Source hosts such as browser, mobile browser, local connector, screen, or custom runtime advertise capabilities. Ekstra apps consume those capabilities.

## Apps

| App | Category | Capabilities | Schemas/routes | Safe claim |
|---|---|---|---|---|
| Prepare to Earn | readiness | Any verified source signal | `/api/v1/operator/readiness`, `/api/v1/operator/devices/:id/readiness` | Validates a connected source for future contribution eligibility. Earnings are not live. |
| Quick Scan | utility | `camera.frame_signal`; fixture/manual test fallback | `scan.text_signal.v1`, `quick_scan.action_output.v1` | Creates a private scan signal. Raw frames are not stored by default. |
| Air Draw | playground | `imu.motion_signal`, `pointer.touch_signal`, `pointer.cursor_signal`, `camera.motion_signal` | `interaction.air_draw.v1` | Draws with the best available motion or pointer signal. |
| Remote Cursor | playground | `pointer.touch_signal`, `imu.motion_signal`, `camera.motion_signal`, `pointer.cursor_signal` | `interaction.cursor.v1` | Controls a cursor through private backend-backed interaction events. |
| Cursor Control | playground | `camera.motion_signal`, pointer fallback | `interaction.cursor_control.v1` | Uses Motion Cursor fallback today. True hand landmark tracking is not live. |
| Live Signal | utility | camera, IMU, screen, or custom source signal | stock signal schemas | Shows private source signal readback without exposing raw private data. |
| Signal -> Screen | screen | `screen.output_signal`, `screen.proof_signal` | `/screen/display-command`, `/screen/push-content`, `/screen/status`, `/screen/proof-of-play` | Sends one private screen trigger and verifies status/proof readback. |

## Capability Model

Apps should ask for outcomes, not source-host choices. For example:

- Air Draw can use IMU, touch, pointer, or future motion sources.
- Remote Cursor can use touch, IMU, hand tracking when actually available, motion, or pointer fallback.
- Quick Scan uses a camera frame signal when permission is granted, with a private fixture/manual test path for verification.
- Signal -> Screen consumes screen output/proof capabilities.

Events include the capability actually used, usually as `capability_used`.

## Privacy Defaults

- App events are private by default.
- Public publishing is never automatic.
- Quick Scan scan text is private.
- Raw frames are not stored by default.
- Runtime tokens, session tokens, claim codes, source configs, credentials, raw frames, private location, and owner IDs are not public fields.
- Sanitized public data only appears through explicit public contribution flows that have been tested separately.

## Safe Builder Example

Builders can inspect public schema metadata:

```js
const schemas = await fetch("https://ekstra.ai/api/v1/public/schemas").then((r) => r.json())
console.log(schemas.observation_envelope.stock_schemas)
console.log(schemas.observation_envelope.app_schemas)
```

Builders should only consume public observations:

```js
const rows = await fetch("https://ekstra.ai/api/v1/public/observations?limit=20").then((r) => r.json())
for (const row of rows.observations || []) {
  console.log(row.schema, row.payload)
}
```

Do not use private operator routes, runtime-token routes, source-config routes, or private scan/device routes from public examples.

## Not Live

- Earnings and payouts are not live.
- No guaranteed income is claimed.
- A marketplace is not part of this bundle.
- True hand landmark tracking is not live.
- CCTV/NVR support is not proven until real reachable hardware is tested.
