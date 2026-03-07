export type ClickMode = "runtime" | "gesture" | "wrist_snap";

export type AxisMode = "tilt" | "yaw" | "roll" | "mixed";

export type ProfileStability = "supported" | "preview" | "experimental";

export type StarterAvailability = "supported" | "planned" | "none";

export type ControlProfile = {
  id: string;
  title: string;
  description: string;
  category: "pointer" | "presentation" | "3d" | "kiosk" | "accessibility" | "media" | "document";
  stability: ProfileStability;
  starter: {
    slug: string | null;
    availability: StarterAvailability;
  };
  motionAxis: {
    horizontal: AxisMode;
    vertical: AxisMode;
  };
  clickMode: ClickMode;
  notes: string[];
};
