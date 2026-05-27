<!--
PAGE CONTENT — source for the route ekstra.ai/build-with-ekstra/camera-intelligence-api/pilot
DEPLOY STEP: wiring this markdown as a live site route (and the contact/intake
form behind the CTA) is a separate deploy step. This file is the source content,
not a wired page.
-->

# Pilot — Camera Intelligence API

The standard feed is honest about its limits: movement counts are
**screening-grade and unvalidated**, and per-class (SKU 5) and
weather/surface (SKU 6) data **do not exist in production yet**. The **pilot is
how those become real for your cameras.**

> **Terms gate:** target cameras must be from providers cleared by per-provider
> terms-of-use review. Attribution and terms apply **per provider**. **Pilot
> terms apply** to all validated and beta deliveries.

## What a pilot does

A scoped engagement on a customer-selected set of public cameras:

1. **Calibrate** the selected cameras (homography → calibrated tier).
2. **Validate** movement counts against ground truth — moves SKU 4
   `validation_status` from `unvalidated` toward `ground_truth_calibrated`.
3. **Deliver a report** with validated results and an explicit coverage
   statement.

For beta SKUs, the pilot runs the relevant classifier in shadow mode over your
selected feeds to produce **real** rows (per-class for SKU 5, weather/surface
for SKU 6).

## Price

- **List: $4,500** — includes calibration + validation + delivered report.
- **Free-pilot option:** free in exchange for a **published case study**.

Direct-only. See [pricing](pricing.md).

## Pilot offers

### 1. 3-intersection traffic study (free pilot)

A defined corridor / set of 3 intersections. We calibrate and validate movement
counts on the selected cameras and deliver a study-grade report. Free in
exchange for a published case study; otherwise the $4,500 list price.

**Good fit:** a mobility/traffic team or public-sector group that needs
validated counts on a defined corridor and can publish results.

### 2. 7-day weather / road-surface pilot (SKU 6)

A 7-day shadow-mode run of the scene/weather/surface classifier over your
selected cameras, producing **real** condition rows (clear/rain/snow/fog;
dry/wet/snow/ice) plus condition-change events — replacing the
`coverage_pending` beta response with production data for those cameras.

**Good fit:** DOT winter-maintenance ops, road-risk/insurance, or a TMC needing
condition awareness on a specific set of cameras.

### 3. Per-incident subrogation pilot

A targeted engagement producing validated, calibrated evidence on a small set of
cameras for incident reconstruction / subrogation support. Scoped per incident;
delivered with a coverage and provenance statement.

**Good fit:** insurance / risk teams needing validated camera-derived evidence
for a specific incident or corridor.

## Process

1. You select target cameras from the registry (must be terms-cleared
   providers).
2. We agree scope + timeline; calibration + validation runs.
3. We deliver the report and, optionally, an ongoing validated feed for those
   cameras.

## Honest framing

We do **not** relabel screening data as validated, and we do **not** ship
synthetic beta rows as real. The pilot is what makes them real. Candidate
providers likely to clear terms quickly (still require confirmation): Finland
(CC BY 4.0), Austin (open-data), TfL (UK, Unified API terms).

[Start a pilot →](get-api-key.md)  <!-- intake/contact form is a deploy step --> ·
or email `info@ekstra.ai`.
