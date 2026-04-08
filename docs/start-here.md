# Start Here

This page is the recommended first-run path for new developers.

## Two paths into Ekstra

### Path 1: Motion starters (runtime)
Build motion-aware web apps using phone sensors. No account needed.

### Path 2: Developer platform (API)
Manage projects, API keys, and packages. Requires email-verified login.

Both paths use `ekstra.ai` as the single platform surface.

---

## Path 1: Motion Starters

### What you need
- a modern desktop browser
- a phone with a browser and motion sensors
- the hosted Ekstra sandbox (or self-hosted runtime)

### 1. Try the live demo

Open on your laptop: [ekstra.ai/build-with-ekstra/demo](https://ekstra.ai/build-with-ekstra/demo)

Scan the QR code with your phone. Grant motion permission. Tap Start.
Your phone becomes a live pointer controlling the cursor on screen.

### 2. Clone and serve locally

```bash
git clone https://github.com/imxdemetri/build-with-ekstra
cd build-with-ekstra/starters/web-phone-pointer
python3 -m http.server 8080
```

Open `http://localhost:8080` in your desktop browser. When served from
localhost, the starter automatically connects to the hosted `ekstra.ai`
WebSocket bridge and phone ingest endpoint.

### 3. Pair the phone

1. Open the page on the desktop
2. Scan the QR code with your phone
3. Grant motion permission on the phone
4. Tap Start Streaming
5. Verify: the desktop shows `ws: connected` and the cursor follows your phone

### 4. Start building

The starters are deliberately simple — replace the demo UI with your own
while keeping the motion connection path intact.

---

## Path 2: Developer Platform

### 1. Request a login link

```bash
curl -X POST https://ekstra.ai/api/developer/cloud/login \
  -H "Content-Type: application/json" \
  -d '{"email": "you@example.com"}'
```

### 2. Verify your email

Click the link in the email from `noreply@ekstra.ai` to get a session token.

### 3. Use the platform

```bash
# List projects
curl https://ekstra.ai/api/developer/cloud/projects \
  -H "Authorization: Bearer YOUR_SESSION_TOKEN"

# Create an API key
curl -X POST https://ekstra.ai/api/developer/cloud/api-keys \
  -H "Authorization: Bearer YOUR_SESSION_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name": "my-key", "scope": "project"}'
```

See the full [Developer Quickstart](https://github.com/imxdemetri/ekstra-os/blob/motion-os-wave1-conformance/docs/developer/quickstart.md).

---

## Platform API

The Platform API at `ekstra.ai/api/v1/*` provides device registry, auth,
campaigns, network stats, map queries, and screen management.

See the full [Platform API Reference](https://github.com/imxdemetri/ekstra-os/blob/motion-os-wave1-conformance/docs/developer/platform-api.md).

---

## What to read next

- [`concepts.md`](concepts.md) — core runtime concepts
- [`architecture.md`](architecture.md) — platform architecture
- [`web-phone-pointer.md`](web-phone-pointer.md) — phone pointer starter details
- [`public-contract.md`](public-contract.md) — API stability guarantees
- [`support-status.md`](support-status.md) — what's supported now vs preview
- [Availability](https://github.com/imxdemetri/ekstra-os/blob/motion-os-wave1-conformance/docs/developer/availability.md) — what's available now / in development / planned
