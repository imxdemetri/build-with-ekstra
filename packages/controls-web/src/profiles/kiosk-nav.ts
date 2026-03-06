import type { ControlProfile } from "../types.js";

export const kioskNav: ControlProfile = {
  id: "kiosk.nav",
  title: "Kiosk Nav",
  description: "Large-target navigation profile for menus, wayfinding, and kiosk surfaces.",
  category: "kiosk",
  stability: "stable",
  motionAxis: {
    horizontal: "yaw",
    vertical: "tilt"
  },
  clickMode: "gesture",
  notes: [
    "Designed for larger UI targets and lower precision demands.",
    "Prioritizes obvious directional movement and durable click gestures."
  ]
};
