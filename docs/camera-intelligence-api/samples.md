<!--
PAGE CONTENT — source for the route ekstra.ai/build-with-ekstra/camera-intelligence-api/samples
DEPLOY STEP: wiring this markdown as a live site route (and hosting the sample
files behind the download links) is a separate deploy step. This file is the
source content, not a wired page.
-->

# Samples — Camera Intelligence API

Try before you buy. Every SKU has a live sample endpoint; PRODUCT_READY SKUs
also have downloadable sample files. Beta SKU samples are **clearly labeled
synthetic** — they are not production data.

> **Terms gate:** attribution and terms **per provider**; commercial resale is
> gated on per-provider terms-of-use review; **pilot terms apply** to validated
> and beta deliveries.

## Live sample endpoint

The fastest way to see real data. Free-tier capped (≤100 rows):

```bash
curl -s "https://ekstra.ai/api/v1/marketplace/sample-dataset?sku=1" | jq
```

Replace `sku=` with `1`, `2`, `3`, `4`, or `7` for real sample rows. `sku=5` and
`sku=6` return a labeled `BETA_SCHEMA_ONLY` envelope with **no production rows**.

## Per-SKU samples

| SKU | Status | Sample endpoint | Sample files (download) |
|---|---|---|---|
| 1 — Public Feed Registry | PRODUCT_READY | `?sku=1` | `sample.csv`, `sample.json` (real rows) |
| 2 — Feed Health / Camera State | PRODUCT_READY | `?sku=2` | `sample.csv`, `sample.json` (real rows) |
| 3 — Capability Graph | PRODUCT_READY | `?sku=3` | `sample.csv`, `sample.json` (real rows) |
| 4 — 15-Min Movement Counts | PRODUCT_READY (screening, **unvalidated**) | `?sku=4` | `sample.csv`, `sample.json` (real, unvalidated) |
| 5 — Multimodal Volume | BETA_SCHEMA_ONLY | `?sku=5` (no prod rows) | `sample.csv` / `.json` labeled **SYNTHETIC, NOT PRODUCTION DATA** |
| 6 — Congestion / Weather / Surface | BETA_SCHEMA_ONLY | `weather-surface` (coverage_pending) | `sample.csv` / `.json` labeled **SYNTHETIC, NOT PRODUCTION DATA** |
| 7 — Historical Archive | LIMITED_HISTORY | `?sku=7` | windowed export, ships with explicit `coverage_window` |

> Download links above are **deploy-pending**: sample files are sourced from the
> platform `marketplace_products/<NN>_*/` folders and must be published to a
> static path during the deploy step. The live `sample-dataset` endpoint works
> today.

## What sample rows look like

SKU 1 live sample (shape from `marketplaceApi.js`; values illustrative):

```json
{
  "sku": 1,
  "view": "marketplace_sources",
  "rows": [
    { "source_id": "ekstra:cam:fdot:...", "provider": "fdot", "lat": 27.95, "lng": -82.46, "source_state": "active", "heading_deg": null }
  ],
  "count": 1,
  "free_tier_capped": 100
}
```

SKU 5 (beta) sample response — honest, no production rows:

```json
{
  "sku": 5,
  "status": "BETA_SCHEMA_ONLY",
  "message": "SKU 5/6 are schema-only (BETA). No production sample rows.",
  "rows": []
}
```

## Honesty note on synthetic samples

SKU 5 and SKU 6 are **schema-only beta**. There is **no per-class detection and
no weather/surface classifier writing production rows**. Any class- or
condition-level value in their sample files is illustrative schema content,
labeled `SYNTHETIC, NOT PRODUCTION DATA`. Real rows for these SKUs come only via
a [pilot](pilot.md).

[See pricing →](pricing.md) · [Get an API key →](get-api-key.md)
