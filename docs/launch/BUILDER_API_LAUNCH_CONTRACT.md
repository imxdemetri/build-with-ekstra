# Builder API Launch Contract

Date: 2026-05-22
Base URL: `https://ekstra.ai/api/v1`
Status: verified by launch E2E run `launch_e2e_1779503787472_d4b977bc` and stock/model smoke run `stock_model_1779503662207_589d2ffb`
OpenAPI status: `https://ekstra.ai/api/v1/openapi.json` includes all public launch endpoints below.

## Public Read Model

Builders can read public Ekstra devices and public observations only through sanitized projection endpoints.

Private devices, private observations, RTSP URLs, runtime tokens, owner ids, source addresses, raw frames, and private model outputs are not exposed by these endpoints.

Stock observations and model outputs are separate layers. Public observations expose sanitized stock signal only after explicit public opt-in. Private model outputs stay behind owner/private insight endpoints unless a future public model-output policy explicitly allows otherwise.

## Endpoints

### Schemas

```http
GET /api/v1/public/schemas
```

Returns the current public launch schemas:

- `observation_envelope`
- `public_device`
- `public_observation`
- `model_output`

The public observation envelope version is `stock.signal.v1`.

### Public Devices

```http
GET /api/v1/public/devices?limit=50
GET /api/v1/public/devices?type=camera&limit=50
```

Returns devices whose owner has enabled public mode and whose platform publication policy allows network visibility.

### Public Observations

```http
GET /api/v1/public/observations?limit=50
GET /api/v1/public/observations?since=2026-05-22T00:00:00Z&limit=50
```

Returns sanitized public stock observations across eligible public devices.

### Public Device Observations

```http
GET /api/v1/public/devices/{device_id}/observations?limit=50
```

Returns sanitized public stock observations for one eligible public device.

## Public Observation Shape

```json
{
  "observation_id": "uuid",
  "source_device_id": "uuid",
  "source_type": "browser_webcam",
  "schema": "camera.frame_signal.v1",
  "observed_at": "2026-05-22T00:00:00.000Z",
  "received_at": "2026-05-22T00:00:01.000Z",
  "location": {
    "location_hint": null,
    "latitude": null,
    "longitude": null,
    "public_location_mode": "hidden"
  },
  "raw_media_stored": false,
  "quality": {
    "status": "received",
    "has_signal": true
  },
  "payload": {
    "schema": "camera.frame_signal.v1",
    "frame_width": 960,
    "frame_height": 540,
    "brightness": 49.46,
    "has_frame": true,
    "capture_mode": "browser_webcam",
    "raw_frame_stored": false
  }
}
```

Presence counts and presence detection are model-output fields, not canonical public stock fields.

## Privacy Boundary

The launch E2E verified:

- A private camera with real packet and model output did not appear in public devices.
- The same private camera did not appear in public observations.
- After switching the camera to public mode and sending a public stock packet, only sanitized stock observation fields appeared.
- Private model output stayed behind owner/private insight endpoints.
- Source config redaction continued to hide credentials and RTSP secrets.

## Auth

The public launch endpoints above do not require an owner session for read access. Future API keys may be added for rate limiting and builder attribution.

Owner/private routes, runtime writes, screen commands, and model attachment require owner session or runtime token as appropriate and are not builder-public.
