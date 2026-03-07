# Core Concepts

This page defines the main product terms used throughout the public Ekstra developer surface.

## Ekstra Runtime

The runtime is the motion OS layer.

It is responsible for:

- ingesting provider data
- normalizing motion into a common model
- routing events to clients and workers
- enforcing policy and transport contracts

## Provider

A provider converts some source of motion or pose data into runtime events.

Examples:

- phone IMU
- camera-based hand tracking
- XR controllers
- future device-specific integrations

The important boundary is that providers do not need to agree on device APIs or vendor-specific payloads. Ekstra is responsible for normalizing those raw inputs into a common runtime motion model.

## `motion.samples`

This is the primary low-level browser-facing topic for motion-driven experiences.

Most front-end integrations should start here.

This topic exists after the runtime has already normalized provider-specific input into a shared motion shape. That is the core platform responsibility.

## Detection Pipeline

The detection pipeline subscribes to motion input and emits higher-level atomic and composition events.

This is used when an experience wants reusable gestures instead of only raw motion.

## Surface Pack

A surface pack maps runtime composition events into application-oriented actions.

Examples:

- `pointer.click`
- `lights.toggle`
- `media.play_pause`

## Control Profile

A control profile is an application-layer behavior model.

Examples:

- pointer
- presentation remote
- orbit 3D
- kiosk navigation

Control profiles are not the runtime itself. They are reusable UX defaults built on top of the runtime.

## Starter

A starter is a supported reference application slice.

It shows developers:

- how to wire the runtime into an app
- how to pair a phone
- how to build a product-specific interaction model

## Frontdoor

The frontdoor is the browser-facing web service that serves static app assets and proxies phone ingest traffic.

Its main job is to make the public deployment shape clean and HTTPS-friendly.
