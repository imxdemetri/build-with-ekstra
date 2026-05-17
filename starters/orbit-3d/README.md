# Orbit 3D Starter

Status: **supported** reference starter.

A working in-browser demo of motion-driven 3D camera navigation, paired with a
phone over the Ekstra runtime. The scene is Three.js (loaded from a CDN via
import map — no build step); the runtime contract is the same as the other
starters in this repo.

## What you get

- a Three.js orbit scene rendered on the laptop
- a paired phone that streams IMU samples over the public runtime
- camera azimuth follows phone yaw (alpha)
- camera polar angle follows phone roll (gamma)
- pitch (beta) dollies the camera in and out as an extra affordance
- "Set neutral" button to re-zero the reference frame from wherever the phone is right now
- the `orbit.3d` control profile from
  [`@ekstraai/controls-web`](../../packages/controls-web/) is the spec for the
  axis mapping above; this starter is the runnable demonstration

## Run it locally

```bash
cd build-with-ekstra/starters/orbit-3d
python3 -m http.server 8080
# Open http://localhost:8080
```

Then on your phone, scan the QR code shown on the laptop. Grant motion
permission and start moving the phone — the camera orbits in real time.

The runtime infrastructure (WebSocket bridge + phone IMU ingest) is hosted at
`ekstra.ai` — the local Python server only serves the static HTML/JS. If you
want a fully self-hosted runtime, see [`deploy/docker/`](../../deploy/docker/).

## Runtime contract

- browser connects to `wss://ekstra.ai/ws` and subscribes to the
  `motion.samples` topic
- phone POSTs IMU samples to `https://ekstra.ai/api/phone-imu/ingest`
- runtime rebroadcasts as `motion.samples` events; the page filters by its own
  `actor_id` so multiple sessions don't collide
- the only event shape consumed by this starter is
  `event.metadata.raw_euler_deg = { alpha, beta, gamma }`

## Files

- `index.html` — laptop view (Three.js scene + pairing UI)
- `controller/index.html` — phone view (IMU permission + POST loop)
- `vendor/ekstra-motion-web.js` — zero-build browser SDK (shared with
  `web-phone-pointer`)
