import type { ControlProfile } from "../types.js";

export const presentationRemote: ControlProfile = {
  id: "presentation.remote",
  title: "Presentation Remote",
  description: "Slide and presentation control profile with simpler directional intent.",
  category: "presentation",
  stability: "preview",
  starter: {
    slug: "presentation-remote",
    availability: "planned",
  },
  motionAxis: {
    horizontal: "yaw",
    vertical: "tilt"
  },
  clickMode: "gesture",
  notes: [
    "Optimized for slide decks and meeting control.",
    "Prioritizes stable navigation over fine cursor precision."
  ]
};
