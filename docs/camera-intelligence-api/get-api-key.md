<!--
PAGE CONTENT — source for the route ekstra.ai/build-with-ekstra/camera-intelligence-api/get-api-key
DEPLOY STEP: wiring this markdown as a live site route (and the key-request /
intake form behind the CTA) is a separate deploy step. This file is the source
content, not a wired page.
-->

# Get an API Key — Camera Intelligence API

You can start **without a key** on the free tier. Request a key when you need
higher limits or access beyond the sample providers.

> **Terms gate:** attribution and terms **per provider**; commercial resale of
> provider-attributed data is gated on per-provider terms-of-use review;
> **pilot terms apply** to validated and beta deliveries.

## Free tier (no key required)

```bash
curl -s "https://ekstra.ai/api/v1/marketplace/sources?limit=3" | jq
```

| Limit | Value |
|---|---|
| Calls per day | 100 (per IP, UTC day) |
| Max rows per query | 1,000 |
| Providers | Sample providers only |
| Bulk export | Not available |
| SLA | None |

Hitting the daily cap returns HTTP `429` with
`{"error": "free_tier_daily_limit_reached"}`.

## What a key unlocks

A request with a valid operator API key is treated as **paid**:

- The free-tier **daily cap is skipped** (your plan quota applies instead).
- The per-query row cap rises from **1,000 → 50,000** (bulk export still goes via
  export jobs).
- Access to a monthly bundle plan (Starter / Pro / Scale) — see
  [pricing](pricing.md).

## How to request a key

1. **Request access** via the key-request form (deploy step — the intake form is
   wired during deploy), or email **`info@ekstra.ai`**. Include your intended
   use, target providers/regions, and expected volume.
2. We confirm **per-provider terms-of-use clearance** for any
   provider-attributed data in your scope.
3. We issue an operator API key.

> The operator API key is the same key family used elsewhere on the Ekstra
> platform (`eko_...` prefix). Treat it as a secret.

## Using your key

```bash
export EKSTRA_API_KEY="eko_..."

curl -s "https://ekstra.ai/api/v1/marketplace/camera-state?state=live&limit=200" \
  -H "Authorization: Bearer $EKSTRA_API_KEY" | jq '.tier'
# "paid"
```

Send the key on every request as `Authorization: Bearer <key>`.

## Next steps

- First calls and response shapes: [`/quickstart`](../quickstart.md)
- All 7 products: [`/sku-catalog`](../sku-catalog.md)
- Pricing and plans: [`pricing.md`](pricing.md)
- Need validated data or beta SKUs on your cameras? [`pilot.md`](pilot.md)
