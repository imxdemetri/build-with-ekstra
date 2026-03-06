import type { ControlProfile } from "../types.js";

export const mediaRemote: ControlProfile = {
  id: "media.remote",
  title: "Media Remote",
  description: "Relaxed control profile for play, pause, scrub, and room-scale media control.",
  category: "media",
  stability: "stable",
  motionAxis: {
    horizontal: "yaw",
    vertical: "tilt"
  },
  clickMode: "gesture",
  notes: [
    "Optimized for lean-back interactions instead of precise pointing.",
    "Good fit for TV and media center experiences."
  ]
};
