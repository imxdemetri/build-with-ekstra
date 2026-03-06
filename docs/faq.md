# FAQ

## Do developers need the private Ekstra runtime repo?

No. This repo is the public developer surface.

## Do end users need to install a native app?

Not for the phone IMU flow demonstrated here. The controller runs in the phone browser.

## Does the runtime need to run somewhere?

Yes. Ekstra is not just a static library. Runtime services must run on hosted infrastructure, on your machine, or in your own deployment.

## What is the fastest way to try Ekstra?

Use the hosted sandbox with the `web-phone-pointer` starter.

## What is the fastest way to production?

Move to self-hosted runtime infrastructure once the interaction model is validated.

## Is the phone pointer the whole product?

No. It is the first public starter and a reference control-profile lane.

## What is the difference between the runtime and control profiles?

The runtime handles ingest, routing, and event transport. Control profiles define how motion should feel in a specific product context.
