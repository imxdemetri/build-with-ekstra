# Camera Intelligence API — Pricing

These are the **published price-book numbers**, cited from the platform pricing
source of truth (`pricing/pricing_generated.json` /
`pricing_cost_x3.md`). They are **not re-derived here** — the model is
`price = unit_cost × 3`.

> **Terms gate:** commercial sale of provider-attributed data is **gated on
> per-provider terms-of-use review**. Attribution and terms apply **per
> provider**. **Pilot terms apply** to validated and beta deliveries.

## Direct price book (first-party, 0% marketplace fee)

| Level | Direct price (USD) |
|---|---:|
| Per 1,000 API calls | $0.675 |
| Per 1,000 rows exported | $0.675 |
| Per provider/day export | $5.00 |
| Per city/region/day export | $5.00 |
| Monthly bundle — Starter (50k calls) | $100 |
| Monthly bundle — Pro (500k calls) | $500 |
| Monthly bundle — Scale (5M calls) | $2,000 |
| Pilot package (calibration + validation + report) | $4,500 |

**Per-call billing is disabled.** Cost×3 works out to ≈ $0.000675/call, which is
below the **$1 minimum-invoice floor**. The revenue unit is therefore the
**monthly bundle** or the **pilot** — not individual calls. Bundles start at
$100/mo.

### Per-SKU billing mode

| SKU | Billing mode |
|---|---|
| 1 / 2 / 3 | Metered + monthly bundle (PRODUCT_READY) |
| 4 | Monthly bundle (screening) + pilot for validated counts |
| 5 / 6 | Pilot / pre-order only (BETA_SCHEMA_ONLY) |
| 7 | Monthly bundle + per-provider/day (LIMITED_HISTORY, window-labeled) |

## Free tier

| Limit | Value |
|---|---|
| Calls per day | 100 (per IP, UTC day) |
| Max rows per query | 1,000 |
| Providers | Sample providers only |
| Bulk export | Not available |
| SLA | None |

No key required for the free tier. Send `Authorization: Bearer <operator api
key>` to move to a paid plan (the daily cap is skipped; plan quota applies).

## Pilot

The **$4,500 pilot package** (or **free** in exchange for a published case
study) is the only path to:

- **Validated** movement counts (moves SKU 4 `validation_status` from
  `unvalidated` toward `ground_truth_calibrated`), and
- Making **SKU 5** (per-class counts) and **SKU 6** (weather/surface) real on a
  customer's selected cameras (running the classifiers in shadow mode over their
  feeds).

The pilot includes calibration + validation + a delivered report with a
coverage statement. Target cameras must be from providers cleared by
per-provider terms-of-use review. See [`pilot`](camera-intelligence-api/pilot.md)
page content.

## Marketplace channel fees

The direct price book above is the **0% fee** first-party price. When a SKU is
sold through an external marketplace, that marketplace's fee is added on top.
These channels are **upload-pending external accounts** (listings are not live
yet):

| Channel | Marketplace fee |
|---|---:|
| Snowflake Marketplace | 14% |
| AWS Data Exchange | 3% |
| Databricks | 15% |
| Datarade | 12.5% |

The **$4,500 pilot** and the free-pilot case-study option are **direct-only**
(not sold through marketplaces).

## Related pages

- [`sku-catalog.md`](sku-catalog.md)
- [`quickstart.md`](quickstart.md)
- [`camera-intelligence-api/pricing.md`](camera-intelligence-api/pricing.md) —
  public pricing page content
- [`camera-intelligence-api/pilot.md`](camera-intelligence-api/pilot.md) — pilot
  CTA page content
