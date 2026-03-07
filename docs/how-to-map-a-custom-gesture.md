# How To Map a Custom Gesture

This guide shows the safest way to add a new gesture-driven behavior to a browser product built on Ekstra.

The current public browser surface gives you two practical layers:

- `motion.samples` for app-local interpretation of raw normalized motion
- `events.composition` for higher-level named gestures when a detection pipeline is present

For most new product work, start with `motion.samples`. Move a behavior up to `events.composition` only after it is stable enough to deserve a reusable name.

## Pick the Right Layer

Use `motion.samples` when:

- you are still exploring the interaction
- you need tight UI feedback in the browser
- the motion pattern is product-specific

Use `events.composition` when:

- the gesture already has a clear name
- you want the same gesture reused across products
- you are running a detection/composition pipeline in self-hosted mode

## Start From a Supported Starter

The fastest path is to copy one of the public starters:

- [`../starters/web-phone-pointer/`](../starters/web-phone-pointer/)
- [`../starters/presentation-remote/`](../starters/presentation-remote/)

Keep the existing connection path intact first:

```text
Phone browser -> phone_imu_provider -> motiond -> ws_bridge -> your web app
```

Then replace the demo behavior with your own mapping logic.

## Browser-Local Gesture Example

This example listens to `motion.samples` and treats a fast roll change as a local confirm action.

```html
<script type="module">
  import { createMotionClient } from "./vendor/ekstra-motion-web.js";

  const motion = createMotionClient({ url: "wss://ekstra.ai/ws" });
  const actorId = "actor-demo";
  let lastGamma = null;
  let lastAt = 0;
  let cooldownUntil = 0;

  await motion.connect();

  motion.onTopic("motion.samples", ({ event }) => {
    if (event.actor_id !== actorId) return;

    const gamma = event.metadata?.raw_euler_deg?.gamma;
    const now = performance.now();
    if (typeof gamma !== "number") return;

    if (lastGamma !== null) {
      const delta = gamma - lastGamma;
      const dt = Math.max(16, now - lastAt);
      const velocity = delta / dt;

      if (now > cooldownUntil && velocity < -0.45 && gamma < -18) {
        cooldownUntil = now + 450;
        confirmCurrentTarget();
      }
    }

    lastGamma = gamma;
    lastAt = now;
  });

  function confirmCurrentTarget() {
    console.log("custom gesture fired");
  }
</script>
```

This is deliberately simple. The important part is the shape:

- read normalized motion from `motion.samples`
- scope it to the current `actor_id`
- derive a gesture from change over time
- debounce the output

## Composition-Level Gesture Example

If your runtime is already publishing named composition events, consume the named event instead of rebuilding the detector in the page:

```js
motion.onTopic("events.composition", ({ event }) => {
  if (event.actor_id !== actorId) return;
  if (event.composition_type !== "click_flick") return;
  confirmCurrentTarget();
});
```

That is the better path when the gesture is already shared across products.

## Recommended Workflow

1. Copy a supported starter.
2. Keep transport, pairing, and actor handling unchanged.
3. Log `motion.samples` first.
4. Build the gesture as a local heuristic in the browser.
5. Test it with one phone and one desktop flow.
6. Promote it to a named composition only after the semantics are stable.

## Guardrails

- Always scope behavior by `actor_id`.
- Treat the WebSocket bridge as a live stream, not durable history.
- Expect reconnects and occasional sample gaps.
- Debounce click-like actions explicitly.
- Keep preview heuristics in the app layer until they are stable enough to share.

## Related Reading

- [`public-contract.md`](public-contract.md)
- [`web-phone-pointer.md`](web-phone-pointer.md)
- [`presentation-remote.md`](presentation-remote.md)
- [`controls-web-api-reference.md`](controls-web-api-reference.md)
