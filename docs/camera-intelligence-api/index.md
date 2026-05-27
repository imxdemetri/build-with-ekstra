<!--
PAGE CONTENT — source for the route ekstra.ai/build-with-ekstra/camera-intelligence-api
DEPLOY STEP: wiring this markdown as a live site route is a separate deploy step
(render this content at the route above). This file is the source content, not a
wired page.
-->

# Camera Intelligence API

**A normalized, cross-provider index of public traffic and transport cameras —
with honest status on every field.**

One schema. One ID convention. One read-only API. We turn 23 scattered public
camera providers into a single addressable feed, and we tell you exactly what is
real, what is screening-grade, and what is still beta.

[Get an API key →](get-api-key.md) · [Start a pilot →](pilot.md) ·
[See pricing →](pricing.md)

---

## The proof

Verified against the platform schema on 2026-05-27:

| Metric | Value |
|---|---|
| Public camera sources | **10,043** |
| External providers | **23** |
| Geographic spread | 16 US states (CA, FL, WA, GA, NY, OR, …) + Canada (ON, AB) + UK + Finland |
| Cameras actively tracking (24h) | **71** |
| Tracks observed (24h) | **45,180** |
| Calibration status of current tracks | **all uncalibrated** (counts are screening-grade, unvalidated) |

We do not inflate these numbers. Where a field has no production backing, the
API returns `coverage_pending` and `null` — never a fabricated value.

> **Terms gate:** attribution and terms apply **per provider**. Commercial
> resale of provider-attributed data is gated on per-provider terms-of-use
> review. **Pilot terms apply** to validated and beta deliveries.

## The seven products

| SKU | Product | Status | One-liner |
|---|---|---|---|
| 1 | Public Feed Registry | **PRODUCT_READY** | What public cameras exist and where (10,043). |
| 2 | Feed Health / Camera State | **PRODUCT_READY** | Independent liveness oracle — live/degraded/dead with confidence. |
| 3 | Capability Graph | **PRODUCT_READY** | What each camera can responsibly be used for. |
| 4 | 15-Min Movement Counts | **PRODUCT_READY (screening, unvalidated)** | Roughly how busy a camera is, by 15-min bin. |
| 5 | Multimodal Volume | **BETA_SCHEMA_ONLY** | Per-class counts — schema + synthetic sample only. |
| 6 | Congestion / Weather / Surface | **BETA_SCHEMA_ONLY** | Scene conditions — schema + synthetic sample only. |
| 7 | Historical Archive | **LIMITED_HISTORY** | Windowed time series of the real signals. |

> **SKU 6 note:** the launch spec called for SKU 6 to ship as PRODUCT_READY
> today. No weather/surface/congestion classifier writes production rows yet, so
> we ship it **BETA_SCHEMA_ONLY** instead. We chose honest labeling over the
> mandated status.

See the full catalog: [`/sku-catalog`](../sku-catalog.md). Per-SKU pages render
from [`sku-detail-template.md`](sku-detail-template.md).

## Why Ekstra

- **vs Vizzion / TrafficLand** — they resell camera *imagery* under bilateral
  agency contracts. We sell the **normalized cross-provider registry + derived
  signals**: one schema, one ID space, public-source provenance. We are the
  index/routing layer, not an image reseller.
- **vs INRIX / StreetLight** — modeled probe products with no addressable
  public-camera inventory. Our wedge is **source-level addressability**: every
  camera has an Ekstra Motion Address, plus an honest capability graph.
- **vs Miovision / Hayden AI / Placer** — purpose-built sensors or mobile
  panels. We index and grade the **existing public fleet** at cross-provider
  scale, and we sell validated counts only via pilot — never pretended in the
  feed.

## Start now

```bash
curl -s "https://ekstra.ai/api/v1/marketplace/sources?limit=3" | jq
```

No key needed on the free tier (100 calls/day, ≤1,000 rows/query, sample
providers).

[Get an API key →](get-api-key.md) ·
[Browse samples →](samples.md) ·
[Marketplace listings →](marketplaces.md)
