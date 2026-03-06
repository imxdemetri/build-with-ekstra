import type { ControlProfile } from "../types.js";

export const pointerPrecision: ControlProfile = {
  id: "pointer.precision",
  title: "Pointer Precision",
  description: "Slower, steadier cursor profile for smaller targets and dense interfaces.",
  category: "pointer",
  stability: "stable",
  motionAxis: {
    horizontal: "yaw",
    vertical: "tilt"
  },
  clickMode: "wrist_snap",
  notes: [
    "Tighter deadzones and lower gain for small click targets.",
    "Best for forms, dashboards, and dense UI controls."
  ]
};
