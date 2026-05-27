# Camera Intelligence API — Quickstart

Make your first call to the Ekstra public-camera data API in a few minutes.
This API is read-only and exposes only public, sanitized rows.

> **Terms gate:** attribution and terms **per provider**; commercial resale is
> gated on per-provider terms-of-use review; **pilot terms apply** to validated
> and beta deliveries.

## 1. (Optional) Get an API key

You can call the API **without a key** on the free tier. Request a key only when
you need higher limits or access beyond the sample providers.

- Request a key: see [`get-api-key`](camera-intelligence-api/get-api-key.md) page
  content, or email `info@ekstra.ai`.
- An operator API key is the same key used elsewhere on the platform
  (`eko_...` prefix family). Send it as `Authorization: Bearer <key>`.

A request **with** a valid key is treated as **paid** (free-tier daily cap is
skipped; your plan quota applies). A request **without** a key is **free tier**.

## 2. First call — list public camera sources

No auth required for the free tier:

```bash
curl -s "https://ekstra.ai/api/v1/marketplace/sources?limit=3" | jq
```

Example response (shape from `marketplaceApi.js`; values illustrative):

```json
{
  "rows": [
    {
      "source_id": "ekstra:cam:caltrans:abc123",
      "agency": "caltrans",
      "provider": "caltrans",
      "url_or_source_ref": "https://cwwp2.dot.ca.gov/.../image.jpg",
      "lat": 34.0561,
      "lng": -118.2468,
      "heading_deg": null,
      "fov_deg": null,
      "refresh_sec": null,
      "source_type": "city_camera",
      "terms_of_use_ref": null,
      "last_alive_ts": "2026-05-27T15:42:11.000Z",
      "source_state": "active",
      "quality_band": null,
      "capability_profile": ["camera.image"],
      "programmability_tier": "inventory_only",
      "provenance_json": {
        "source": "caltrans",
        "region": "CA",
        "country": "US",
        "derived_from": "devices+camera_calibrations"
      }
    }
  ],
  "count": 3,
  "tier": "free"
}
```

Note the `null` fields (`heading_deg`, `fov_deg`, `refresh_sec`,
`terms_of_use_ref`, `quality_band`): these are **coverage_pending** — no backing
column exists in production yet, so the API returns `null` rather than inventing
a value.

## 3. Authenticated call

```bash
curl -s "https://ekstra.ai/api/v1/marketplace/sources?provider=wsdot&limit=50" \
  -H "Authorization: Bearer $EKSTRA_API_KEY" | jq '.tier'
# "paid"
```

With a key, `tier` returns `"paid"` and the per-query row cap rises from 1,000
to 50,000 (bulk export still goes via export jobs).

## 4. A `coverage_pending` response

Beta SKUs and unmaterialized views return an explicit envelope — never fake
rows:

```bash
curl -s "https://ekstra.ai/api/v1/marketplace/weather-surface" | jq
```

```json
{
  "coverage_pending": true,
  "status": "BETA_SCHEMA_ONLY",
  "reason": "No weather/road-surface classifier writes production rows yet. Pilot-only. See marketplace_products/06_congestion_weather_surface/.",
  "rows": [],
  "count": 0
}
```

## Free-tier limits

| Limit | Value |
|---|---|
| Calls per day | 100 (per IP, UTC day) |
| Max rows per query | 1,000 |
| Providers | Sample providers only |
| Bulk export | Not available |
| SLA | None |

Hitting the cap returns HTTP `429`:

```json
{
  "error": "free_tier_daily_limit_reached",
  "limit": 100,
  "message": "Free tier is 100 calls/day. Request an API key ..."
}
```

## Next steps

- Browse all 7 products: [`sku-catalog.md`](sku-catalog.md)
- More curl + SQL examples: [`sample-queries.md`](sample-queries.md)
- Pricing, pilot, and the terms gate: [`pricing.md`](pricing.md)
- Machine-readable spec: `GET https://ekstra.ai/api/v1/marketplace/openapi.json`
