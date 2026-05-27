# Camera Intelligence API

The Ekstra **Camera Intelligence API** is a read-only data API over a normalized,
cross-provider index of **public** traffic and transport cameras. It is the
public-feed surface of the Ekstra platform: one schema, one ID convention, and
honest status labels for every field.

This is a **Public-Feed Data Products** surface. It exposes only public,
sanitized rows. It does not expose raw video, credentials, internal URLs, or
private device data.

> **Status:** Early product launch. Some SKUs are PRODUCT_READY, some are
> screening-grade/unvalidated, and two are schema-only beta. Each SKU below
> carries its own honest status badge — read them before building.
>
> **Terms gate:** Attribution and terms apply **per provider**. Commercial
> resale of provider-attributed data is gated on per-provider terms-of-use
> review. **Pilot terms apply** to validated and beta deliveries.

## What is real today

Verified against the platform schema on 2026-05-27:

- **10,043** public camera sources across **23** external providers
  (16 US states incl. CA, FL, WA, GA, NY, OR, plus Canada (ON, AB), the United
  Kingdom, and Finland).
- **71** cameras actively producing tracks in a 24h window.
- **45,180** tracks observed in that 24h window.
- **All current tracks are uncalibrated** — movement counts are screening-grade
  and unvalidated.

These are the real numbers behind the SKUs. Where a field is not yet populated
in production, the API returns it as `NULL` and the response carries a
`coverage_pending` flag rather than fabricating a value.

## Base URL and auth

- Base URL: `https://ekstra.ai`
- Route prefix: `/api/v1/marketplace`
- Auth: `Authorization: Bearer <operator api key>`
- OpenAPI: `GET https://ekstra.ai/api/v1/marketplace/openapi.json`

A request **without** a bearer key is treated as **free tier**. A request **with**
a valid operator key is treated as **paid** and the free-tier daily cap is
skipped (your plan quota is enforced separately).

## Free tier

| Limit | Value |
|---|---|
| Calls per day | 100 (per IP, UTC day) |
| Max rows per query | 1,000 |
| Providers | Sample providers only |
| Bulk export | Not available |
| SLA | None |

Exceeding the daily cap returns HTTP `429` with
`{"error": "free_tier_daily_limit_reached"}`. To raise limits, request an API
key (see [`quickstart.md`](quickstart.md)).

## The seven SKUs

| SKU | Product | Status |
|---|---|---|
| 1 | Public Feed Registry | **PRODUCT_READY** |
| 2 | Feed Health / Camera State | **PRODUCT_READY** (strongest asset) |
| 3 | Capability Graph | **PRODUCT_READY** |
| 4 | 15-Minute Movement Counts | **PRODUCT_READY (screening tier — unvalidated)** |
| 5 | Multimodal Volume (per-class) | **BETA_SCHEMA_ONLY** (no production data) |
| 6 | Congestion / Weather / Surface | **BETA_SCHEMA_ONLY** (no production data) |
| 7 | Historical Archive | **LIMITED_HISTORY** (short, recent window) |

> **SKU 6 spec deviation, stated plainly:** the launch spec lists SKU 6 as
> "ship today / PRODUCT_READY." That is not achievable honestly — no weather,
> road-surface, or congestion classifier writes production rows yet. SKU 6 ships
> as **BETA_SCHEMA_ONLY** (schema + clearly-labeled synthetic sample + pilot
> CTA). We chose honest labeling over the mandated status.

Full per-SKU detail: [`sku-catalog.md`](sku-catalog.md).

## Endpoints

All endpoints are `GET`, read-only, and served by `marketplaceApi.js` in the
platform-api repo. They read from the `marketplace_*` views, which filter to
public, sanitized rows only.

| Endpoint | SKU | Returns |
|---|---|---|
| `/api/v1/marketplace/sources` | 1 | Public feed registry rows |
| `/api/v1/marketplace/sources/{source_id}` | 1 | Single source detail |
| `/api/v1/marketplace/camera-state` | 2 | Liveness / health per source |
| `/api/v1/marketplace/capabilities` | 3 | Capability graph per source |
| `/api/v1/marketplace/provider-health` | 2 | Provider-level health rollup |
| `/api/v1/marketplace/events` | — | Event stream (sparse for public sources) |
| `/api/v1/marketplace/counts-15min` | 4 | 15-min screening counts |
| `/api/v1/marketplace/weather-surface` | 6 | Always `coverage_pending` (beta) |
| `/api/v1/marketplace/sample-dataset?sku=N` | 1–7 | Free-tier-capped sample rows |
| `/api/v1/marketplace/openapi.json` | — | Machine-readable spec |

## The `coverage_pending` contract

The API never invents data. When a backing view is not materialized, or a
product (SKU 5/6) has no production rows, you get an explicit HTTP `200`
envelope instead of a fabricated row:

```json
{
  "coverage_pending": true,
  "reason": "No weather/road-surface classifier writes production rows yet. Pilot-only.",
  "rows": [],
  "count": 0
}
```

Within a row, a field that has no production backing column is returned as
`null` (for example `heading_deg`, `phash`, `weather_class`, `object_class`).

## Related pages

- [`sku-catalog.md`](sku-catalog.md) — one section per SKU
- [`quickstart.md`](quickstart.md) — get a key, first call
- [`pricing.md`](pricing.md) — price book, free tier, pilot, terms gate
- [`sample-queries.md`](sample-queries.md) — curl + SQL examples
