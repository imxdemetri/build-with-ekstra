# Parking Map Starter

A 250-line single-file browser app that renders **live NYC parking
rules** on a Mapbox dark map. No build step, no framework, no API key
needed for the Ekstra side. Drop your Mapbox token in and serve.

## What this is for

This starter is for the **data persona** — developers building apps
that *consume* Ekstra's data without producing motion. Examples:

- Parking apps that show legal spots near you
- City dashboards that visualize curb regulations
- Delivery routing tools that avoid no-stopping zones
- Compliance tools for fleets

If you're building something with **motion input** (phones, cameras,
XR), see the [`web-phone-pointer`](../web-phone-pointer/) starter
instead. Ekstra serves both audiences from one API.

## What you'll see

Open the page and you'll see ~80 real NYC parking rules around
Washington Square Park, color-coded:

- 🔴 Red dots — restricted right now (no parking, no standing, etc.)
- 🟢 Green dots — legal right now
- 🟠 Amber dots — metered (paid) parking, currently in force

Click any dot to see the raw NYC DOT rule text, when the rule
expires, and the source. Click anywhere else on the map to refetch
rules at that location.

## Run it

1. Get a free Mapbox public token from
   [mapbox.com/account/access-tokens](https://account.mapbox.com/access-tokens/)
2. Open `index.html` and replace `MAPBOX_TOKEN` with yours
3. Serve the file:
   ```bash
   cd starters/parking-map
   python -m http.server 18080
   ```
4. Open `http://127.0.0.1:18080/index.html`

That's it. No bundler, no install, no `node_modules`.

## The whole integration

The single `fetchRules` function is the entire Ekstra integration:

```js
async function fetchRules(lat, lng, radius) {
  const url = new URL("https://ekstra.ai/api/v1/curb-rules/near");
  url.searchParams.set("lat", String(lat));
  url.searchParams.set("lng", String(lng));
  url.searchParams.set("radius_m", String(radius));
  const res = await fetch(url, { cache: "no-store" });
  const data = await res.json();
  return data.rules || [];
}
```

That's 9 lines. The rest of `index.html` is map setup, marker
rendering, and popup styling. **Ekstra is just the data; the app is
yours.**

## What you get back

Each rule includes:

- `kind` — `metered`, `no_parking`, `alternate_side`, `time_limited`,
  `bus_lane`, etc. (17 kinds)
- `latitude`, `longitude` — WGS84
- `days_of_week` — `[0..6]` Sun=0, Sat=6
- `start_minute`, `end_minute` — minutes since local midnight
- `timezone` — IANA timezone (`America/New_York` for NYC rules)
- `active_now` — server-computed: is this rule in force right now?
- `next_state_change_at` — ISO timestamp of when the rule flips
  state next (e.g. legal until 7pm)
- `rate_cents_per_hour` — for metered spots
- `max_duration_minutes` — for time-limited spots
- `raw_text` — the original sign text (e.g. `"2HR Pas Mon-Sat 0730-1900"`)
- `source` — `nyc_dot`, `nyc_dot_meters`, etc.
- `details` — source-specific metadata (borough, street names, meter
  number, etc.)

Full schema in the
[OpenAPI spec](https://ekstra.ai/api/v1/openapi.json).

## What's next

- **Try other coordinates.** Click anywhere on the map to refetch
  rules at that location.
- **Combine with Ekstra Spaces** (`/api/v1/spaces/near`) for
  camera-confirmed real-time parking availability.
- **Build a real product.** A live NYC parking app, a delivery
  routing tool, a city dashboard — the data layer is the same.

## Available data today

- **45,417 NYC parking rules** ingested from NYC DOT at 98.8% parse
  rate, time-aware
- **Cross-region camera adapters** in active rollout (LA, London,
  Helsinki, Toronto, more)
- See https://ekstra.ai/api/v1/network/stats for live counts

## Need help

- **Docs:** https://ekstra.ai/llms-full.txt — paste this into your
  AI coding assistant (Cursor, Claude, Copilot) and it knows how to
  use the entire Ekstra API
- **API spec:** https://ekstra.ai/api/v1/openapi.json
- **Issues:** https://github.com/imxdemetri/build-with-ekstra/issues
