<!--
PAGE CONTENT — source for the route ekstra.ai/build-with-ekstra/camera-intelligence-api/pricing
DEPLOY STEP: wiring this markdown as a live site route is a separate deploy step.
This file is the source content, not a wired page.
-->

# Pricing — Camera Intelligence API

Simple, published pricing. The numbers below are cited from the platform price
book (`pricing/pricing_generated.json`); they are **not re-derived** (model:
`price = unit_cost × 3`).

> **Terms gate:** commercial sale of provider-attributed data is **gated on
> per-provider terms-of-use review**. Attribution and terms apply **per
> provider**. **Pilot terms apply** to validated and beta deliveries.

## Free tier — start without a key

| Limit | Value |
|---|---|
| Calls per day | 100 (per IP, UTC day) |
| Max rows per query | 1,000 |
| Providers | Sample providers only |
| Bulk export | Not available |
| SLA | None |

[Get an API key →](get-api-key.md)

## Direct price book (first-party, 0% marketplace fee)

| Level | Direct price (USD) |
|---|---:|
| Per 1,000 API calls | $0.675 |
| Per 1,000 rows exported | $0.675 |
| Per provider/day export | $5.00 |
| Per city/region/day export | $5.00 |
| **Monthly bundle — Starter** (50k calls) | **$100** |
| **Monthly bundle — Pro** (500k calls) | **$500** |
| **Monthly bundle — Scale** (5M calls) | **$2,000** |
| **Pilot package** (calibration + validation + report) | **$4,500** |

**Per-call billing is disabled.** Cost×3 is ≈ $0.000675/call, below the **$1
minimum-invoice floor**, so the revenue unit is the **monthly bundle** or the
**pilot**. Bundles start at $100/mo.

## What each plan unlocks

| | Free | Bundle | Pilot |
|---|---|---|---|
| Registry / health / capability (SKU 1–3) | Sample providers | Full | Full |
| Screening counts (SKU 4, unvalidated) | Sample | Full | Full |
| **Validated** counts | — | — | ✓ |
| **SKU 5 / 6** real rows on your cameras | — | — | ✓ |
| Bulk export | — | ✓ (export jobs) | ✓ |
| SLA | — | Plan-dependent | Per engagement |

## Pilot

The **$4,500 pilot** (or **free** in exchange for a published case study) is the
only path to validated counts and to making SKU 5/6 real on your selected
cameras. [Start a pilot →](pilot.md)

## Marketplace channels (fees added on top)

These external listings are **upload-pending external accounts** — not live yet.
When live, the marketplace fee is added to the direct price:

| Channel | Fee |
|---|---:|
| Snowflake Marketplace | 14% |
| AWS Data Exchange | 3% |
| Databricks | 15% |
| Datarade | 12.5% |

The pilot and the free-pilot case-study option are **direct-only**.
[See marketplace listings →](marketplaces.md)
