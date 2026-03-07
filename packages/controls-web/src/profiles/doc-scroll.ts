import type { ControlProfile } from "../types.js";

export const docScroll: ControlProfile = {
  id: "doc.scroll",
  title: "Doc Scroll",
  description: "Document and reading profile biased toward vertical movement and page travel.",
  category: "document",
  stability: "experimental",
  starter: {
    slug: null,
    availability: "none",
  },
  motionAxis: {
    horizontal: "yaw",
    vertical: "tilt"
  },
  clickMode: "gesture",
  notes: [
    "Optimized for reading, reviewing, and page traversal.",
    "Useful for docs, dashboards, and long-form content."
  ]
};
