# Camera Intelligence API — Sample Queries

Copy-paste curl and SQL examples for the main read-only endpoints. All response
shapes are taken from `marketplaceApi.js` and the `marketplace_*` views; values
are illustrative.

> **Terms gate:** attribution and terms **per provider**; commercial resale is
> gated on per-provider terms-of-use review; **pilot terms apply** to validated
> and beta deliveries.

- Base URL: `https://ekstra.ai`
- Auth (optional for free tier): `Authorization: Bearer <operator api key>`
- Free tier: 100 calls/day, ≤1,000 rows/query, sample providers, no bulk export,
  no SLA.

The **SQL** examples query the same `marketplace_*` views the API reads. They
apply to channels that expose the views directly (Snowflake / Databricks /
direct DB access under a paid plan). The view layer already filters to public,
sanitized rows.

---

## SKU 1 — Public Feed Registry (`sources`)

### curl

```bash
# All sources for one provider, first 50
curl -s "https://ekstra.ai/api/v1/marketplace/sources?provider=wsdot&limit=50" | jq

# Only active sources
curl -s "https://ekstra.ai/api/v1/marketplace/sources?source_state=active&limit=100" | jq

# Single source detail
curl -s "https://ekstra.ai/api/v1/marketplace/sources/ekstra:cam:caltrans:abc123" | jq
```

### SQL

```sql
-- Count public cameras per provider
SELECT provider, COUNT(*) AS cameras
FROM marketplace_sources
GROUP BY provider
ORDER BY cameras DESC;

-- Bounding-box discovery (downtown Seattle example)
SELECT source_id, provider, lat, lng, source_state
FROM marketplace_sources
WHERE lat BETWEEN 47.59 AND 47.63
  AND lng BETWEEN -122.36 AND -122.31;
```

> `heading_deg`, `fov_deg`, `refresh_sec`, `terms_of_use_ref`, `quality_band`
> are **coverage_pending** and return `NULL`.

---

## SKU 2 — Feed Health / Camera State (`camera-state`)

### curl

```bash
# Only live cameras
curl -s "https://ekstra.ai/api/v1/marketplace/camera-state?state=live&limit=200" | jq

# State for one source
curl -s "https://ekstra.ai/api/v1/marketplace/camera-state?source_id=ekstra:cam:wsdot:xyz" | jq

# Provider-level health rollup
curl -s "https://ekstra.ai/api/v1/marketplace/provider-health" | jq
```

### SQL

```sql
-- Gate ingestion: only confidently-live sources
SELECT source_id, state, state_confidence, reason_code, observed_ts
FROM marketplace_camera_state
WHERE state = 'live'
  AND state_confidence >= 0.8;

-- Liveness mix per provider (join to registry)
SELECT s.provider, cs.state, COUNT(*) AS n
FROM marketplace_camera_state cs
JOIN marketplace_sources s USING (source_id)
GROUP BY s.provider, cs.state
ORDER BY s.provider, n DESC;
```

> Frame-quality fields (`phash`, `entropy`, `edge_density`, `blur_score`,
> `ssim_to_reference`, `daylight_flag`, `weather_class`) and the
> `frozen`/`obscured`/`moved` states are **coverage_pending** (NULL / not
> produced). `state` is heartbeat-grade liveness, not frame-grade integrity.

---

## SKU 3 — Capability Graph (`capabilities`)

### curl

```bash
# Sources usable for vehicle measurement
curl -s "https://ekstra.ai/api/v1/marketplace/capabilities?capability_class=vehicle&limit=100" | jq

# Only rule-ready sources
curl -s "https://ekstra.ai/api/v1/marketplace/capabilities?rule_ready=true&limit=100" | jq
```

### SQL

```sql
-- Capability census per class
SELECT capability_class, homography_status, COUNT(*) AS n
FROM marketplace_capabilities
GROUP BY capability_class, homography_status
ORDER BY n DESC;

-- Pre-flight a study: cameras at least approximately calibrated
SELECT source_id, capability_class, capability_subtype, homography_status,
       rule_ready, action_proof_ready
FROM marketplace_capabilities
WHERE homography_status IN ('approximate', 'calibrated');
```

> **0 sources are `calibrated`** today, so `rule_ready` / `action_proof_ready`
> are mostly `FALSE`, and `supported = TRUE` means "declared / representable,"
> not "verified in production." `quality_grade` is **coverage_pending** (NULL).
> Rows exist only for the 6,924 sources with a calibration record.

---

## SKU 4 — 15-Minute Movement Counts (`counts-15min`)

### curl

```bash
# Recent bins for one source
curl -s "https://ekstra.ai/api/v1/marketplace/counts-15min?source_id=ekstra:cam:nyc_dot:123&limit=96" | jq

# Filter by movement code
curl -s "https://ekstra.ai/api/v1/marketplace/counts-15min?movement_code=passing&limit=500" | jq
```

### SQL

```sql
-- Time-of-day passing-movement profile for one camera
SELECT date_trunc('hour', bin_start_ts) AS hr,
       SUM(count) AS passing
FROM marketplace_counts_15min
WHERE source_id = 'ekstra:cam:nyc_dot:123'
  AND movement_code = 'passing'
GROUP BY hr
ORDER BY hr;

-- Rank busiest cameras over the available window (screening)
SELECT source_id, SUM(count) AS total_movements
FROM marketplace_counts_15min
WHERE movement_code IN ('passing', 'parked')
GROUP BY source_id
ORDER BY total_movements DESC
LIMIT 25;
```

> **Screening tier, UNVALIDATED.** `validation_status = unvalidated` for all
> current data, `quality_grade = C`, `object_class = other` (no vehicle/ped/bike
> class), `confidence_score` is NULL, movement is `parked`/`passing`/`unknown`
> (not turning-movement). Coverage ≈ 71 actively-tracking cameras (~45,180
> tracks/24h), not all 10,043. Validated counts are sold via the **pilot**.

---

## Per-SKU sample dataset (free-tier capped)

```bash
# Registry sample
curl -s "https://ekstra.ai/api/v1/marketplace/sample-dataset?sku=1" | jq

# SKU 5 (beta) returns a labeled schema-only response, no production rows
curl -s "https://ekstra.ai/api/v1/marketplace/sample-dataset?sku=5" | jq
```

SKU 5/6 responses are explicitly labeled `BETA_SCHEMA_ONLY` with no production
rows — see [`sku-catalog.md`](sku-catalog.md).

## Related pages

- [`quickstart.md`](quickstart.md)
- [`sku-catalog.md`](sku-catalog.md)
- [`pricing.md`](pricing.md)
- OpenAPI: `GET https://ekstra.ai/api/v1/marketplace/openapi.json`
