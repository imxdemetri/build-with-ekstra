# Start Here

This page is the recommended first-run path for new developers.

## What You Need

- this repo
- a modern desktop browser
- a phone with a browser and motion sensors
- either:
  - the hosted Ekstra sandbox, or
  - a self-hosted Ekstra runtime

## Recommended Path: Hosted Sandbox

The hosted sandbox is the fastest way to validate the developer flow.

### 1. Clone the repo

```powershell
git clone https://github.com/imxdemetri/build-with-ekstra
cd build-with-ekstra
```

### 2. Serve the starter locally

```powershell
cd starters\web-phone-pointer
python -m http.server 8080
```

### 3. Open the starter against the hosted sandbox

Use this URL in a desktop browser:

```text
http://127.0.0.1:8080/index.html?wsUrl=wss%3A%2F%2Fwsbridge-production-2ec6.up.railway.app%2Fws&controllerBase=https%3A%2F%2Ffrontdoor-production.up.railway.app%2Fexamples%2Fphone_imu_controller%2Findex.html&ingestUrl=https%3A%2F%2Ffrontdoor-production.up.railway.app%2Fapi%2Fphone-imu%2Fingest
```

### 4. Pair the phone

1. Open the page on the desktop.
2. Scan the QR code on the page.
3. On the phone, grant motion permission.
4. Tap `Start Streaming`.
5. Return to the desktop page and verify that motion samples are arriving.

### 5. Start modifying the starter

The `web-phone-pointer` starter is deliberately simple:

- browser page receives `motion.samples` over WebSocket
- phone controller posts IMU data over HTTPS
- the page maps motion into pointer and click behavior

The normal first change is to replace the demo UI with your own UI while keeping the motion connection path intact.

## When To Move To Self-Hosted

Use self-hosted mode when you need:

- private data handling
- lower latency and local networking
- custom runtime or provider behavior
- repeatable team environments

See [`self-hosted-docker.md`](self-hosted-docker.md).

## What To Read Next

- [`concepts.md`](concepts.md)
- [`architecture.md`](architecture.md)
- [`web-phone-pointer.md`](web-phone-pointer.md)
