# Open Source Building Blocks

Ekstra should not rebuild every sensor stack, transport, or receiver ecosystem from first principles.

The platform value is the normalization layer:

- ingest motion and motion-relevant signals from heterogeneous providers
- convert them into a stable internal motion model
- route them to apps, automations, and other valid receivers

This page lists the proven standards and open-source projects that fit that strategy.

## What Ekstra Owns

Ekstra should own:

- provider contracts
- normalized motion schemas
- runtime routing and transport
- composition and surface routing
- control profiles
- receiver abstractions
- developer-facing contracts

Ekstra should not try to own:

- every camera landmarking stack
- every XR runtime
- every automation bus
- every reverse proxy
- every test runner

## Browser and Phone Motion

Use these for browser-native motion input:

- W3C Device Orientation and Motion
  - `https://www.w3.org/TR/orientation-event/`
- modern browser fetch, WebSocket, and Permissions APIs

These are the right foundations for the current phone IMU public wedge. Ekstra uses the browser as the provider surface, then normalizes the resulting motion into its own engine model.

## Camera and Landmarking

Use these instead of inventing a new perception stack:

- MediaPipe
  - `https://ai.google.dev/edge/mediapipe/solutions/guide`

This is the right class of dependency for face, pose, and hand providers. Ekstra should adapt camera outputs into normalized motion observations rather than trying to compete with mature landmarking systems.

## XR and Spatial Device Runtimes

Use standards and mature runtime layers:

- OpenXR
  - `https://registry.khronos.org/OpenXR/`
- WebXR
  - `https://immersive-web.github.io/webxr/`

These are the correct device-facing layers for XR providers. Ekstra should normalize XR pose, hands, and controller state into the same engine boundary used by other providers.

## Smart Home and Physical Receivers

Use existing automation ecosystems on the receiver side:

- MQTT and Eclipse Mosquitto
  - `https://mosquitto.org/`
- Home Assistant MQTT integrations
  - `https://www.home-assistant.io/integrations/mqtt/`
- Matter / Connected Home over IP
  - `https://project-chip.github.io/connectedhomeip/`

Ekstra should route normalized motion and composition into these systems, not replace them.

## Robotics and Machine Receivers

For machine actions and robotics-facing outputs:

- ROS 2
  - `https://docs.ros.org/en/jazzy/How-To-Guides/Topics-Services-Actions.html`

This is the right kind of receiver ecosystem for robot actions, machine control, and spatially aware industrial systems.

## Ambient and Infrastructure Signals

Not all motion-relevant inputs come from humans.

The long-term provider graph should also include:

- public transit feeds
  - GTFS Realtime
  - `https://gtfs.org/documentation/realtime/reference/`
- weather feeds
  - Open-Meteo
  - `https://open-meteo.com/en/docs`
- ocean and wave data
  - NOAA NDBC
  - `https://www.ndbc.noaa.gov/docs/ndbc_web_data_guide.pdf`

These are not motion sensors in the narrow handheld sense. They are still motion-relevant environmental inputs that can influence routing, behaviors, and downstream actions.

## CSI and Radio-Based Sensing

For radio and ambient sensing research paths:

- Nexmon CSI
  - `https://github.com/seemoo-lab/nexmon_csi`
- ESP-CSI
  - `https://docs.espressif.com/projects/esp-idf/en/stable/esp32/api-guides/wifi.html`

These are the right starting points for CSI-related provider work. Ekstra should not try to invent a CSI capture stack before proving the normalization and routing layer.

## Infrastructure and Delivery

Use proven tools for the operational layer:

- Caddy
  - `https://caddyserver.com/docs/caddyfile/directives/reverse_proxy`
- Playwright
  - `https://playwright.dev/docs/intro`
- Docker Compose
  - `https://docs.docker.com/compose/`

These are the right tools for HTTPS routing, smoke validation, and self-hosted deployment shape.

## Strategic Rule

The platform strategy is:

- reuse mature provider-facing and receiver-facing ecosystems
- normalize them into one Ekstra motion layer
- expose a simpler developer contract so product teams do not have to care which device or signal produced the motion

That is the real value of the platform.
