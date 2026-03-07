import type { ControlProfile } from "../types.js";

export const modelInspect: ControlProfile = {
  id: "model.inspect",
  title: "Model Inspect",
  description: "Inspection-first 3D profile focused on stable viewing and object examination.",
  category: "3d",
  stability: "experimental",
  starter: {
    slug: null,
    availability: "none",
  },
  motionAxis: {
    horizontal: "yaw",
    vertical: "roll"
  },
  clickMode: "runtime",
  notes: [
    "Designed for viewing and inspecting models more than editing them.",
    "Good fit for product viewers and galleries."
  ]
};
