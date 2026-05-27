<!--
PAGE CONTENT — source for the route ekstra.ai/build-with-ekstra/camera-intelligence-api/marketplaces
DEPLOY STEP: wiring this markdown as a live site route is a separate deploy step.
The external listing links are PLACEHOLDERS — they go live only after the
external marketplace accounts are created and the listings are uploaded.
-->

# Marketplace Listings — Camera Intelligence API

The Camera Intelligence API is sold **directly** via `ekstra.ai` today. Listings
on external data marketplaces are **prepared but not live** — each is pending an
external account and listing upload.

> **Status:** all external marketplace links below are **placeholders —
> upload pending external account.** The direct API and pilot are available now.
>
> **Terms gate:** attribution and terms **per provider**; commercial resale is
> gated on per-provider terms-of-use review; **pilot terms apply**.

## Channels

| Channel | Marketplace fee | Listing status | Link |
|---|---:|---|---|
| **Direct (ekstra.ai)** | 0% | **Live** | [Get an API key](get-api-key.md) · [Pricing](pricing.md) |
| Snowflake Marketplace | 14% | Upload pending external account | _(placeholder — listing URL pending)_ |
| AWS Data Exchange | 3% | Upload pending external account | _(placeholder — listing URL pending)_ |
| Databricks Marketplace (Delta Sharing) | 15% | Upload pending external account | _(placeholder — listing URL pending)_ |
| Datarade | 12.5% | Upload pending external account | _(placeholder — listing URL pending)_ |

Marketplace fees are **added on top** of the direct price book. See
[pricing](pricing.md).

## What's prepared per channel

Each channel has a listing package staged in the platform repo
(`marketplace_packages/<channel>/`): listing copy, pricing (cost×3), product
metadata, and channel-specific delivery plan (Snowflake native app / external
table, AWS S3 layout + dataset OpenAPI, Databricks Delta Sharing + table
schemas, Datarade provider profile). Going live requires:

1. Creating the external marketplace/provider account.
2. Uploading the staged listing package.
3. Confirming **per-provider terms-of-use clearance** for any provider-attributed
   data included in the listing.
4. Wiring delivery (external table / Delta share / S3 dataset).

Until those steps complete, the listing links above remain placeholders.

## Direct is the only channel for the pilot

The **$4,500 pilot** and the free-pilot case-study option are **direct-only** —
they are not sold through external marketplaces. [Start a pilot →](pilot.md)
