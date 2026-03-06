import type { ControlProfile } from "../types.js";

export const accessibilityNav: ControlProfile = {
  id: "accessibility.nav",
  title: "Accessibility Nav",
  description: "Reduced-effort control profile for accessible browsing and selection.",
  category: "accessibility",
  stability: "experimental",
  motionAxis: {
    horizontal: "mixed",
    vertical: "tilt"
  },
  clickMode: "gesture",
  notes: [
    "Intended as a starting point for lower-effort navigation patterns.",
    "Should be paired with app-level larger hit targets and confirm flows."
  ]
};
