import type { ControlProfile } from "../types.js";

export const orbit3d: ControlProfile = {
  id: "orbit.3d",
  title: "Orbit 3D",
  description: "3D navigation profile for orbit, inspect, and item viewing.",
  category: "3d",
  stability: "stable",
  motionAxis: {
    horizontal: "yaw",
    vertical: "roll"
  },
  clickMode: "runtime",
  notes: [
    "Optimized for rotation and inspection, not standard browsing.",
    "Best paired with explicit zoom and selection affordances in the app."
  ]
};
