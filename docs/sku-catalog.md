# SKU Catalog — Camera Intelligence API

Seven Public-Feed Data Products over the Ekstra public-camera index. Each SKU
below states its honest status, what is **real**, what is **coverage_pending**,
its primary buyer + budget code, and its competitive wedge.

> **Terms gate (applies to every SKU):** attribution and terms **per provider**;
> commercial resale is gated on per-provider terms-of-use review; **pilot terms
> apply** to validated and beta deliveries.

Ground truth (verified 2026-05-27): 10,043 public sources, 23 external
providers, 71 actively-tracking cameras, 45,180 tracks in 24h, all uncalibrated.

---

## SKU 1 — Public Feed Registry

- **Status:** PRODUCT_READY
- **Endpoint:** `GET /api/v1/marketplace/sources`
- **Buyer / budget code:** Traffic-engineering & ITS consultancies (`TE-INV`);
  GIS / smart-city data teams (`GIS-FEED`); AV / HD-mapping & simulation
  (`AV-SRC`); civic-tech / research (`CIVIC-OPEN`).

The inventory layer: *what public cameras exist and where*. One normalized
registry across 23 providers, one ID convention (`source_id` = Ekstra Motion
Address), one geometry convention (`lat`/`lng`), one liveness anchor
(`last_alive_ts`). 10,043 sources spanning 16 US states, Canada, the UK, and
Finland.

- **Real at full scale:** `source_id`, `provider`/`agency`, `lat`, `lng`,
  `source_type`, `source_state`, `last_alive_ts`, `capability_profile`,
  `programmability_tier`, `url_or_source_ref`, `provenance_json`.
- **Coverage_pending (NULL):** `heading_deg`, `fov_deg`, `refresh_sec`,
  `terms_of_use_ref`, `quality_band` — no backing column in production yet.
- **Known data-quality note:** a subset of Canada/Alberta rows carry
  `country="US"` (wrong); tracked internally.

**Wedge:** Vizzion / TrafficLand resell camera *imagery* under bilateral agency
contracts. We sell the **normalized cross-provider registry** — one schema, one
ID space, public-source provenance. Versus INRIX / StreetLight (modeled probe
products), our wedge is **source-level addressability**: every camera has a
Motion Address. Versus in-house scraping, we replace 23 brittle scrapers with
one stable contract.

---

## SKU 2 — Feed Health / Camera State

- **Status:** PRODUCT_READY — **the strongest asset in the line**
- **Endpoints:** `GET /api/v1/marketplace/camera-state`,
  `GET /api/v1/marketplace/provider-health`
- **Buyer / budget code:** ITS operations / TMC integrators (`ITS-OPS`);
  data-pipeline / ML teams (`MLOPS-DQ`); camera-feed aggregators (`AGG-SLA`);
  civic-tech / research (`CIVIC-OPEN`).

A real-time liveness oracle over the registry: for every source, *is this feed
live, degraded, dead, or unknown — and how confident are we?* Derived from
device heartbeat plus `camera_tracks` recency. Includes a `state_confidence`
(0–1) and a machine `reason_code`, plus a provider-level rollup.

- **Real at full scale:** `source_id`, `observed_ts`, `state`
  (`live`/`degraded`/`dead`/`unknown`), `state_confidence`, `reason_code`.
- **Coverage_pending (NULL):** `phash`, `entropy`, `edge_density`, `blur_score`,
  `ssim_to_reference`, `daylight_flag`, `weather_class`, and the
  `frozen`/`obscured`/`moved` states — all require a per-frame analyzer that
  does not exist in production.
- **Rollup caveat:** `uptime_pct_24h` is instantaneous availability (live/total
  snapshot), not a true rolling integral; `uptime_pct_7d` is coverage_pending.

**Wedge:** an **independent, cross-provider liveness oracle** with confidence +
reason codes at 10k-source scale — something image resellers (Vizzion,
TrafficLand) do not offer. Honest boundary: we sell **heartbeat-grade liveness,
not frame-grade integrity**. We do not yet detect stuck/blocked/moved cameras,
and we say so.

---

## SKU 3 — Capability Graph

- **Status:** PRODUCT_READY (6,924 calibration-derived rows)
- **Endpoint:** `GET /api/v1/marketplace/capabilities`
- **Buyer / budget code:** Traffic-engineering & ITS (`TE-CAP`); AV / HD-mapping
  (`AV-SRC`); platform / app developers on Ekstra (`DEV-PLT`); smart-city
  procurement (`GIS-FEED`).

The capability layer: SKU 1 says a camera *exists*; SKU 3 says *what you can
responsibly do with it*. Each row gives a `capability_class`
(`spatial`/`vehicle`/`object`), a `capability_subtype` (scene class), a
`homography_status` (`uncalibrated`/`approximate`/`calibrated`), and two
readiness booleans: `rule_ready` and `action_proof_ready`.

- **Real (6,924 rows):** `source_id`, `capability_class`, `capability_subtype`,
  `homography_status`, `rule_ready`, `action_proof_ready`, `last_verified_ts`.
- **Coverage_pending (NULL):** `quality_grade` — no per-capability eval score
  for public cameras yet.
- **Truthful skew:** **0 sources are `calibrated`** today, so `rule_ready` /
  `action_proof_ready` resolve mostly to `FALSE`. `supported = TRUE` means
  "declared / representable," **not** "verified in production." Rows exist only
  for the 6,924 sources with a calibration record (a subset of 10,043).

**Wedge:** Miovision / Hayden AI deploy purpose-built sensors with known
calibration; they do not provide a **cross-provider capability index over
existing public cameras**. We grade the public fleet you already have access to,
and we surface the sparse-readiness truth instead of implying every camera is
analytics-ready.

---

## SKU 4 — 15-Minute Movement Counts (Screening Tier)

- **Status:** PRODUCT_READY — **screening tier, UNVALIDATED**
- **Endpoint:** `GET /api/v1/marketplace/counts-15min`
- **Buyer / budget code:** Traffic-engineering screening (`TE-SCREEN`); retail /
  real-estate siting (`SITE-SCREEN`); micromobility / logistics planning
  (`MOBOPS-SCREEN`); researchers / civic-tech (`CIVIC-OPEN`).

Binned counts of detected movements per public camera in 15-minute windows.
Derived from real `camera_tracks`: ~45,180 tracks across ~71 actively-tracking
cameras in a 24h window, bucketed by `first_seen_ts` and grouped by
`classification`.

- **Real:** `source_id`, `bin_start_ts`, `bin_end_ts`, `movement_code`
  (`parked`/`passing`/`unknown`), `count`, `quality_grade`, `validation_status`,
  `lineage_json`.
- **Hard limits (state to every buyer):**
  - `validation_status = unvalidated` for **all** current data (0 calibrated
    tracks). Never sold as validated.
  - `movement_code` is `parked`/`passing`/`unknown` — **not** turning-movement,
    **not** approach-by-approach.
  - `object_class` is always `other` (coverage_pending) — **no vehicle / ped /
    bike / scooter class** (that is SKU 5, beta).
  - `quality_grade = C` (uncalibrated) for all current data.
  - `confidence_score` is coverage_pending (NULL).
  - Coverage is ~71 cameras, not all 10,043 — only sources actively producing
    tracks appear.

**Wedge:** versus StreetLight / INRIX (modeled probe volumes), this is *observed
camera activity* — complementary and cheaper for screening. Versus Miovision /
Hayden AI (validated, vehicle-classified, turning-movement from dedicated
hardware), we are explicitly the **screening tier below that bar**. Versus
Placer.ai (pedestrian visit panels), this is the **vehicle-side** lens.
Validated counts are sold via the pilot, never pretended in the feed.

---

## SKU 5 — Multimodal Volume (Per-Class Counts)

- **Status:** BETA_SCHEMA_ONLY — **no production data**
- **Endpoint:** `GET /api/v1/marketplace/sample-dataset?sku=5` (synthetic sample
  only)
- **Buyer / budget code (intended):** transportation planners / complete-streets
  (`PLAN-MODE`); micromobility operators (`MICRO-DEMAND`); active-transportation
  research (`CIVIC-RESEARCH`); insurance / VRU risk (`RISK-VRU`).

*Intended:* per-class movement volumes (car / truck / bus / motorcycle /
bicycle / pedestrian / e-scooter) per camera per 15-min bin — the multimodal
extension of SKU 4.

- **What's real:** nothing class-level. `camera_tracks.classification` carries
  only `parked`/`passing`/`unknown`; no per-class detector writes production
  rows (`device_model_outputs` has 342 rows, **0 public**).
- **What ships:** schema + a **clearly-labeled synthetic sample** + a pilot
  pre-order CTA. Any per-class number in samples is marked
  `BETA_SCHEMA_ONLY — SYNTHETIC SAMPLE, NOT PRODUCTION DATA`.
- **To make it real:** run a per-class detector over public frames in shadow
  mode, write classified tracks, populate `object_class`. Net-new engineering.

**Wedge (once real):** Miovision delivers validated multimodal counts from
dedicated hardware; our wedge would be doing it over the *existing public camera
fleet* at cross-provider scale — but **no parity claim** until built and
validated. Closest real product today is SKU 4. Delivered **only via pilot**.

---

## SKU 6 — Congestion / Weather / Road Surface

- **Status:** BETA_SCHEMA_ONLY — **no production data**
- **Endpoint:** `GET /api/v1/marketplace/weather-surface` (always returns
  `coverage_pending`)
- **Buyer / budget code (intended):** DOT winter-maintenance ops (`RWIS-OPS`);
  insurance / road-risk (`RISK-ROAD`); traffic-management centers (`TMC-SA`);
  logistics / fleet routing (`FLEET-WX`).

> **Spec deviation, stated plainly:** the launch spec mandates SKU 6 as
> PRODUCT_READY shipping real rows today. **Not achievable honestly** — no
> weather / road-surface / congestion classifier writes production rows.
> `weather_class` is coverage_pending (always NULL); `device_model_outputs` has
> 0 public rows; the event view emits no weather/congestion events. We ship SKU
> 6 as **BETA_SCHEMA_ONLY**, not PRODUCT_READY.

*Intended:* per-camera scene-condition signals — congestion level, weather class
(clear/rain/snow/fog), road-surface state (dry/wet/snow/ice), with
change-events.

- **What ships:** schema + clearly-labeled synthetic sample + pilot CTA. All
  condition values in samples are marked `SYNTHETIC, NOT PRODUCTION DATA`.
- **To make it real:** run the scene/weather/surface classifier over public
  frames in shadow mode → write to `device_model_outputs.public_payload` →
  repopulate `weather_class` and emit condition-change events. **The largest
  hidden engineering item in this launch.**

**Wedge (once real):** camera-observed surface/weather per public camera at
cross-provider scale, complementing modeled/sensor RWIS — no parity claim until
built. Delivered **only via pilot**.

---

## SKU 7 — Historical Archive

- **Status:** LIMITED_HISTORY — short, recent window
- **Endpoint:** windowed export of `counts-15min` + `camera-state`
- **Buyer / budget code:** transportation researchers (`RESEARCH-TS`);
  traffic-engineering consultancies (`TE-TREND`); data-science / ML
  (`MLOPS-BACKTEST`); civic-tech / journalism (`CIVIC-OPEN`).

A historical time-series export of the real public-feed signals — 15-minute
movement counts (SKU 4) and camera-state/liveness (SKU 2) — over the available
window, per source. Same schemas as the live SKUs, delivered as a windowed
series for backtesting and trend analysis.

- **Real:** the same fields as SKU 4 (counts) and SKU 2 (state), as historical
  rows.
- **LIMITED_HISTORY:** the window is **short and recent** (ingest is recent).
  Counts history covers the actively-tracking subset (~71 cameras); state
  history begins at ingest — **no pre-ingest back-fill**.
- **Inherited limits:** counts are `unvalidated`, `object_class = other`,
  movement is `parked`/`passing`/`unknown`; state frame-metrics are
  coverage_pending.
- Every delivery carries an explicit `coverage_window` (provider, start,
  end/present). **Do not market multi-year history — there isn't any yet.**

**Wedge:** versus StreetLight / INRIX historical (deep modeled-probe history),
we offer *observed camera* history, honestly windowed. Versus DIY archival,
customers who didn't start archiving early can buy the window Ekstra has
captured.

---

## Pricing and pilot

All SKUs share one price book. See [`pricing.md`](pricing.md). The **$4,500
pilot** (or free for a published case study) is the only path to **validated**
counts (SKU 4) and to making SKU 5/6 real on a customer's selected cameras.
