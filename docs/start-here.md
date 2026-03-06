# Start Here

## What a developer needs

To build with Ekstra, a developer needs:
- this public repo for docs, starters, and control profiles
- an Ekstra runtime endpoint, either hosted by Ekstra or self-hosted with Docker

## Recommended first path

Use hosted sandbox mode first.

That path looks like this:
1. clone this repo
2. open one starter
3. point it at the provided runtime and ingest URLs
4. run the app locally
5. test with a phone browser

## Self-hosted path

Use self-hosted mode when you need:
- local-only testing
- lower latency
- custom provider and connector changes
- private network deployment

See [`../deploy/docker/README.md`](../deploy/docker/README.md).
