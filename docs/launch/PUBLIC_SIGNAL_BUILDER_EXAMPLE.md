# Public Signal Builder Example

Status: tested public projection pattern. Private device data is not used.

This example reads only public Ekstra endpoints:

- `GET https://ekstra.ai/api/v1/public/schemas`
- `GET https://ekstra.ai/api/v1/public/observations`

Public observations appear only after a contributor explicitly enables sanitized contribution.

## Minimal Browser Example

```html
<div id="status">Loading public Ekstra signals...</div>
<pre id="output"></pre>

<script>
const API = "https://ekstra.ai/api/v1";

async function loadPublicSignals() {
  const [schemasResponse, observationsResponse] = await Promise.all([
    fetch(`${API}/public/schemas`),
    fetch(`${API}/public/observations?limit=10`),
  ]);

  if (!schemasResponse.ok || !observationsResponse.ok) {
    throw new Error("Public Ekstra API request failed");
  }

  const schemas = await schemasResponse.json();
  const observations = await observationsResponse.json();
  const latest = observations.observations?.[0] || null;

  document.querySelector("#status").textContent = latest
    ? `${latest.schema} from ${latest.source_type}`
    : "No public observations right now";

  document.querySelector("#output").textContent = JSON.stringify({
    public_schemas: schemas.observation_envelope?.stock_schemas,
    latest_public_observation: latest && {
      schema: latest.schema,
      source_type: latest.source_type,
      received_at: latest.received_at,
      raw_media_stored: latest.raw_media_stored,
      quality: latest.quality,
      payload: latest.payload,
      location: latest.location,
    },
  }, null, 2);
}

loadPublicSignals().catch((error) => {
  document.querySelector("#status").textContent = error.message;
});
</script>
```

## Expected Fields

Public stock observations may include:

- `observation_id`
- `source_device_id`
- `source_type`
- `schema`
- `observed_at`
- `received_at`
- `location`
- `raw_media_stored`
- `quality`
- `payload`

Private model outputs do not appear in the public observations feed. Any future public model-output projection must be sanitized and explicitly opted in.

## Privacy Boundaries

Public endpoints must not expose:

- operator ID or owner ID
- session token
- runtime token
- claim code
- source config
- RTSP/source URL
- credentials
- raw frame data
- private room/site labels
- private precise location

Location is hidden or coarse unless the contributor explicitly allows more.

## Builder Notes

Treat public data as a live feed, not guaranteed inventory. Devices stay private until contributors opt in, and future contribution eligibility is separate from this example.
