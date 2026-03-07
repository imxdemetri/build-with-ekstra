import { accessibilityNav } from "./profiles/accessibility-nav.js";
import { docScroll } from "./profiles/doc-scroll.js";
import { kioskNav } from "./profiles/kiosk-nav.js";
import { mediaRemote } from "./profiles/media-remote.js";
import { modelInspect } from "./profiles/model-inspect.js";
import { orbit3d } from "./profiles/orbit-3d.js";
import { pointerBasic } from "./profiles/pointer-basic.js";
import { pointerPrecision } from "./profiles/pointer-precision.js";
import { presentationRemote } from "./profiles/presentation-remote.js";
import { relaxedPointer } from "./profiles/relaxed-pointer.js";
import type { ControlProfile } from "./types.js";

export type {
  ControlProfile,
  AxisMode,
  ClickMode,
  ProfileStability,
  StarterAvailability,
} from "./types.js";
export {
  pointerBasic,
  pointerPrecision,
  presentationRemote,
  orbit3d,
  kioskNav,
  mediaRemote,
  accessibilityNav,
  docScroll,
  modelInspect,
  relaxedPointer,
};

export const controlProfiles: readonly ControlProfile[] = [
  pointerBasic,
  pointerPrecision,
  presentationRemote,
  orbit3d,
  kioskNav,
  mediaRemote,
  accessibilityNav,
  docScroll,
  modelInspect,
  relaxedPointer,
];

export const supportedControlProfiles = controlProfiles.filter(
  (profile) => profile.stability === "supported",
);
export const previewControlProfiles = controlProfiles.filter(
  (profile) => profile.stability === "preview",
);
export const experimentalControlProfiles = controlProfiles.filter(
  (profile) => profile.stability === "experimental",
);

export function getControlProfile(id: string): ControlProfile | undefined {
  return controlProfiles.find((profile) => profile.id === id);
}
