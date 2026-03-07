import type { ControlProfile } from "../types.js";

export const pointerBasic: ControlProfile = {
  id: "pointer.basic",
  title: "Pointer Basic",
  description: "General browser pointer profile for phone-driven cursor control.",
  category: "pointer",
  stability: "supported",
  starter: {
    slug: "web-phone-pointer",
    availability: "supported",
  },
  motionAxis: {
    horizontal: "mixed",
    vertical: "tilt"
  },
  clickMode: "wrist_snap",
  notes: [
    "Optimized for phone-in-hand browsing.",
    "Best starting point for general web interactions."
  ]
};
