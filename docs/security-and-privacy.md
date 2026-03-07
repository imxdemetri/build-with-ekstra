# Security and Privacy

This public repository is focused on developer onboarding, not a complete platform security reference.

Still, developers should understand the current boundary.

## Hosted Sandbox

The hosted sandbox is intended for:

- evaluation
- prototypes
- integration experiments

It should not be treated as a production SLA environment.

It should also not be treated as a production security boundary.

## Browser and Phone Transport

For phone-based browser control, HTTPS matters.

In particular:

- iPhone Safari generally requires HTTPS before motion permissions are available
- public deployments should terminate TLS at the frontdoor

## Current Public Preview Security Posture

For the current hosted preview:

- browser and phone traffic should terminate over HTTPS
- the browser bridge is a shared preview surface
- the public starter flow is designed for onboarding and evaluation, not regulated workloads
- developers should assume the shared sandbox may change or be reset

## Sensitive Data

The public sandbox currently demonstrates the phone IMU flow.

Developers should avoid treating shared hosted endpoints as the final destination for:

- sensitive production workloads
- regulated data
- long-lived session records
- private environment telemetry that requires retention or deletion guarantees

If those properties matter, self-host the runtime.

## Origin and Access Guidance

For self-hosted deployments:

- keep `motiond` on private networking
- terminate TLS at the frontdoor
- restrict browser origins and CORS to the apps you control
- put auth in front of action sinks and downstream connectors
- use private service-to-service networking where possible

## Replay and Event Semantics

The browser bridge is a live stream interface. It should not be treated as an audited event ledger.

Production applications should:

- tolerate reconnects
- tolerate missed events during reconnect windows
- avoid assuming exactly-once browser delivery
- keep critical side effects behind explicit confirmation or idempotent downstream design

## Recommended Production Direction

- self-host the runtime or use a future production-hosted Ekstra environment
- keep browser and phone endpoints behind HTTPS
- use private networking between runtime services
- treat public demo infrastructure as evaluation infrastructure
