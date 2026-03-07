# Security Policy

If you believe you have found a security issue in the public Ekstra developer surface:

- do not open a public issue with exploit details
- use GitHub private vulnerability reporting if it is enabled for this repository
- otherwise contact the maintainer privately through GitHub or `info@ekstra.ai`

For non-sensitive runtime hardening issues, a normal issue or pull request is acceptable.

## Scope

This repository primarily contains:

- documentation
- starters
- browser-facing package code

Sensitive runtime vulnerabilities may instead belong in the private Ekstra runtime repository.

## Hosted Preview Boundary

The public `ekstra.ai` sandbox is a shared developer preview.

It is intended for:

- onboarding
- evaluation
- prototype integrations

It is not currently positioned as:

- a production SLA service
- a regulated-data environment
- a hardened multi-tenant boundary

## Current Security Expectations

For the public preview:

- browser and phone entry points should use HTTPS
- `motiond` itself should remain off the public internet in self-hosted deployments
- browser bridge consumers should tolerate reconnects and live-stream semantics
- downstream actions should use explicit auth and confirmation where the product requires it

## Production Guidance

If you are moving beyond the public preview, the minimum recommended posture is:

- terminate TLS at the frontdoor
- keep runtime services on private networking
- restrict origins and CORS to approved apps
- require auth on action sinks and connectors
- pin versions of the runtime and public package surface
- self-host if you need stronger privacy, retention, or availability guarantees

## Related Documentation

- [`docs/security-and-privacy.md`](docs/security-and-privacy.md)
- [`docs/public-contract.md`](docs/public-contract.md)
- [`docs/support-status.md`](docs/support-status.md)
