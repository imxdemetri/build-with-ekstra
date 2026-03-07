import type { ControlProfile } from "../types.js";

export const relaxedPointer: ControlProfile = {
  id: "pointer.relaxed",
  title: "Relaxed Pointer",
  description: "Softer pointer profile for casual browsing and higher-comfort movement.",
  category: "pointer",
  stability: "experimental",
  starter: {
    slug: null,
    availability: "none",
  },
  motionAxis: {
    horizontal: "mixed",
    vertical: "tilt"
  },
  clickMode: "wrist_snap",
  notes: [
    "Prioritizes comfort over precision.",
    "Useful for media browsing and exploratory interactions."
  ]
};
