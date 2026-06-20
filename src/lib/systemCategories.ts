export const SYSTEM_CATEGORIES = [
  "hvac",
  "access-control",
  "lighting",
  "shades",
  "irrigation",
  "cameras",
  "alarms",
  "pa",
  "media",
] as const;

export type SystemCategory = (typeof SYSTEM_CATEGORIES)[number];

export const SYSTEM_CATEGORY_LABELS: Record<SystemCategory, string> = {
  hvac: "HVAC",
  "access-control": "Access Control",
  lighting: "Lighting",
  shades: "Shades",
  irrigation: "Irrigation",
  cameras: "Cameras",
  alarms: "Alarms",
  pa: "PA",
  media: "Media",
};

export interface CategoryForDeviceInput {
  type?: string;
  discriminator?: string;
}

export function categoryForDevice(
  device: CategoryForDeviceInput | null | undefined,
): SystemCategory | null {
  if (!device || !device.type) return null;

  switch (device.type) {
    case "thermostat":
      return "hvac";
    case "lock":
      return "access-control";
    case "alarm":
      return "alarms";
    case "camera":
    case "motionSensor":
      return "cameras";
    case "windowCovering":
      return "shades";
    case "dimmer":
      return "lighting";
    case "switch":
      if (device.discriminator === "irrigation") return "irrigation";
      return "lighting";
    case "mediaSource":
      if (device.discriminator === "paSystem") return "pa";
      return "media";
    default:
      console.warn("UnknownSystemCategory", {
        deviceType: device.type,
        discriminator: device.discriminator,
      });
      return null;
  }
}
