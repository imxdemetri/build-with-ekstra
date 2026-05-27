<!--
PAGE CONTENT — source for the route ekstra.ai/build-with-ekstra/camera-intelligence-api/sku/[skuid]
DEPLOY STEP: wiring this markdown as a live, parameterized site route is a
separate deploy step. This file is a TEMPLATE: render one page per SKU by
substituting the {{tokens}} below from the SKU catalog. It is not a wired page.
-->

# SKU Detail Page Template

This template defines how each `/sku/[skuid]` page renders. Tokens in
`{{double braces}}` are filled per SKU from [`/sku-catalog`](../sku-catalog.md)
and the platform `marketplace_products/<NN>_*/README.md` source of truth.

## Token reference

| Token | Source |
|---|---|
| `{{sku_id}}` | 1–7 |
| `{{sku_name}}` | Product name |
| `{{status_badge}}` | One of: `PRODUCT_READY`, `PRODUCT_READY (screening, unvalidated)`, `BETA_SCHEMA_ONLY`, `LIMITED_HISTORY` |
| `{{endpoint}}` | `/api/v1/marketplace/...` |
| `{{buyers_table}}` | Buyer persona + budget code rows |
| `{{what_it_is}}` | Plain-English description |
| `{{real_fields}}` | Fields real at scale |
| `{{coverage_pending_fields}}` | Fields returned NULL / not produced |
| `{{wedge}}` | Honest competitive positioning |
| `{{billing_mode}}` | From pricing source of truth |

## Rendered layout (per SKU)

---

> # SKU {{sku_id}} — {{sku_name}}
>
> **Status:** `{{status_badge}}`
>
> **Terms gate:** attribution and terms **per provider**; commercial resale is
> gated on per-provider terms-of-use review; **pilot terms apply** to validated
> and beta deliveries.
>
> ## What it is
>
> {{what_it_is}}
>
> **Endpoint:** `GET https://ekstra.ai{{endpoint}}`
>
> ## Who buys it
>
> {{buyers_table}}  <!-- persona | budget code | why -->
>
> ## What's real vs coverage_pending
>
> - **Real at scale:** {{real_fields}}
> - **coverage_pending (NULL / not produced):** {{coverage_pending_fields}}
>
> _For beta SKUs (5, 6), this section MUST state: "No production data. Samples
> are labeled SYNTHETIC, NOT PRODUCTION DATA." For SKU 4, it MUST state
> "screening-grade, UNVALIDATED." For SKU 7, it MUST show the explicit
> `coverage_window`._
>
> ## Competitive wedge
>
> {{wedge}}
>
> ## Try it
>
> ```bash
> curl -s "https://ekstra.ai{{endpoint}}?limit=3" | jq
> ```
>
> ## Pricing
>
> Billing mode: {{billing_mode}}. See the [pricing page](pricing.md). The
> $4,500 pilot (or free for a case study) is the path to validated data and to
> making beta SKUs real on selected cameras — see the [pilot page](pilot.md).

---

## Worked example — SKU 2 rendered

> # SKU 2 — Feed Health / Camera State
>
> **Status:** `PRODUCT_READY` (the strongest asset in the line)
>
> **Terms gate:** attribution/terms per provider; pilot terms apply.
>
> ## What it is
>
> A real-time, independent liveness oracle over 10,043 public sources: for every
> camera, is the feed `live`, `degraded`, `dead`, or `unknown` — with a
> confidence (0–1) and a machine reason code. Includes a provider-level rollup.
>
> **Endpoint:** `GET https://ekstra.ai/api/v1/marketplace/camera-state`
>
> ## Who buys it
>
> | Persona | Budget code | Why |
> |---|---|---|
> | ITS operations / TMC integrators | `ITS-OPS` | One uptime signal across DOT fleets. |
> | Data-pipeline / ML teams | `MLOPS-DQ` | Gate ingestion on liveness. |
> | Camera-feed aggregators | `AGG-SLA` | Independent liveness oracle for SLA claims. |
> | Civic-tech / research | `CIVIC-OPEN` | Measure public-camera availability. |
>
> ## What's real vs coverage_pending
>
> - **Real at scale:** `source_id`, `observed_ts`, `state`, `state_confidence`,
>   `reason_code`.
> - **coverage_pending (NULL):** `phash`, `entropy`, `edge_density`,
>   `blur_score`, `ssim_to_reference`, `daylight_flag`, `weather_class`, and the
>   `frozen`/`obscured`/`moved` states. This is **heartbeat-grade liveness, not
>   frame-grade integrity** — we do not yet detect stuck/blocked/moved cameras.
>
> ## Competitive wedge
>
> An independent cross-provider liveness oracle with confidence + reason codes
> at 10k-source scale — something image resellers (Vizzion, TrafficLand) do not
> offer.
>
> ## Try it
>
> ```bash
> curl -s "https://ekstra.ai/api/v1/marketplace/camera-state?state=live&limit=3" | jq
> ```
>
> ## Pricing
>
> Billing mode: metered + monthly bundle (PRODUCT_READY).
