# Security and Privacy

This public repository is focused on developer onboarding, not a complete platform security reference.

Still, developers should understand the current boundary.

## Hosted Sandbox

The hosted sandbox is intended for:

- evaluation
- prototypes
- integration experiments

It should not be treated as a production SLA environment.

## Browser and Phone Transport

For phone-based browser control, HTTPS matters.

In particular:

- iPhone Safari generally requires HTTPS before motion permissions are available
- public deployments should terminate TLS at the frontdoor

## Sensitive Data

The public sandbox currently demonstrates the phone IMU flow.

Developers should avoid treating shared hosted endpoints as the final destination for sensitive production workloads.

## Recommended Production Direction

- self-host the runtime or use a future production-hosted Ekstra environment
- keep browser and phone endpoints behind HTTPS
- use private networking between runtime services
- treat public demo infrastructure as evaluation infrastructure
