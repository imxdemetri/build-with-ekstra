# Start Here

This page is the recommended first-run path for new developers.

## What You Need

- a modern desktop browser
- a phone with a browser and motion sensors
- either:
  - the hosted Ekstra sandbox, or
  - a self-hosted Ekstra runtime

## Recommended Path: Hosted Sandbox

The hosted sandbox is the fastest way to validate the developer flow.

### 1. Try the live reference demo

Open:

```text
https://ekstra.ai/build-with-ekstra/demo
```

This is the fastest way to validate the end-to-end browser flow before editing local code.
The current hosted reference demo is the pointer flow. The presentation remote is the second supported starter and is intended to be served locally against the same hosted endpoints.

### 2. Clone the repo

```powershell
git clone https://github.com/imxdemetri/build-with-ekstra
cd build-with-ekstra
```

### 3. Serve a supported starter locally

Pointer:

```powershell
cd starters\web-phone-pointer
python -m http.server 8080
```

Presentation remote:

```powershell
cd starters\presentation-remote
python -m http.server 8080
```

### 4. Open the starter against the hosted sandbox

Use this URL in a desktop browser:

```text
http://127.0.0.1:8080/index.html?wsUrl=wss%3A%2F%2Fekstra.ai%2Fws&controllerBase=https%3A%2F%2Fekstra.ai%2Fbuild-with-ekstra%2Fcontroller&ingestUrl=https%3A%2F%2Fekstra.ai%2Fapi%2Fphone-imu%2Fingest
```

### 5. Pair the phone

1. Open the page on the desktop.
2. Scan the QR code on the page.
3. On the phone, grant motion permission.
4. Tap `Start Streaming`.
5. Return to the desktop page and verify that motion samples are arriving.

### 6. Verify the starter health signals

Before modifying the app, confirm:

- the desktop page shows `ws: connected`
- the sample counter starts increasing
- the debug panel shows a non-null `ingestHealth`
- the phone page shows `status=streaming`
- the phone page `sent` counter increases over time

If the phone streams but the desktop does not move, use [`web-phone-pointer.md`](web-phone-pointer.md) or [`presentation-remote.md`](presentation-remote.md) for troubleshooting.

### 7. Start modifying the starter

The supported starters are deliberately simple:

- browser page receives `motion.samples` over WebSocket
- phone controller posts IMU data over HTTPS
- the page maps motion into pointer or presentation behavior

The normal first change is to replace the demo UI with your own UI while keeping the motion connection path intact.

## Read Before You Integrate

For the current public preview, these two docs define the safe public boundary:

- [`public-contract.md`](public-contract.md)
- [`support-status.md`](support-status.md)

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
- [`presentation-remote.md`](presentation-remote.md)
