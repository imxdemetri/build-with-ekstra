# Capability-Based Interactions

Date: 2026-05-23

Ekstra interactions are capability-based.

The product abstraction is not a phone, camera, or sensor. A source host advertises capabilities, and an interaction consumes the best available capability for the outcome.

## Source Capabilities

- `camera.frame_signal`
- `camera.window_capture_signal`
- `camera.hand_tracking_signal`
- `camera.motion_signal`
- `imu.motion_signal`
- `pointer.touch_signal`
- `pointer.cursor_signal`
- `screen.output_signal`
- `screen.proof_signal`
- `drone.telemetry_signal`
- `custom.sensor_signal`

## Source Hosts

- `browser_desktop`
- `browser_mobile`
- `local_connector`
- `camera_device`
- `drone_bridge`
- `screen_device`
- `custom_runtime`

Hosts are where signals come from. They are not the interaction model.

## Air Draw

Air Draw uses the best available motion or pointer capability.

Priority:

1. `imu.motion_signal`
2. `pointer.touch_signal`
3. `pointer.cursor_signal`
4. `camera.motion_signal`

Events use `interaction.air_draw.v1` and include `capability_used`.

## Remote Cursor

Remote Cursor controls a cursor using the best available motion, touch, hand, or pointer capability.

Priority:

1. `pointer.touch_signal`
2. `imu.motion_signal`
3. `camera.hand_tracking_signal`
4. `camera.motion_signal`
5. `pointer.cursor_signal`

Events use `interaction.cursor.v1` and include `capability_used`.

## Cursor Control

Cursor Control uses hand tracking when a real hand capability exists. Without that, it uses a clearly labeled motion cursor fallback.

Events use `interaction.cursor_control.v1` and include:

- `capability_used`
- `tracking_mode`
- `x`
- `y`
- `confidence`

## Privacy

Interaction events are private by default. Public publishing is not automatic.

Public examples must not expose:

- owner id
- session token
- runtime token
- claim code
- source config
- credentials
- raw frames
- private location

## Builder Use

Builders can consume sanitized public observations when a contributor explicitly publishes a source. Private interaction events remain private to the operator unless explicitly published through the existing public projection system.

No earnings or payout behavior is implied by these interaction examples.
