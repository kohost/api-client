export type DeviceNotificationName =
  | "communicationFailure"
  | "replaceBattery"
  | "hardwareFailure"
  | "airFilterNeedsCleaned"
  | "airFilterNeedsReplaced"
  | "scheduleMaintenance"
  | "outsideSafeTemperatureRange"
  | "outsideSafeHumidityRange"
  | "bellTrouble"
  | "monitoringTrouble"
  | "powerTrouble"
  | "burglarAlarm"
  | "fireAlarm"
  | "smokeDetected"
  | "doorAjar"
  | "configIssue"
  | "acMainsDisconnected";

export interface InferDeviceNotificationsInput {
  type?: string;
  discriminator?: string;
  offline?: unknown;
  batteryLevel?: unknown;
  bellTrouble?: unknown;
  monitoringTrouble?: unknown;
  powerLevel?: unknown;
  equipment?: unknown;
}

const THERMOSTAT_INFERRED: DeviceNotificationName[] = [
  "airFilterNeedsCleaned",
  "airFilterNeedsReplaced",
  "scheduleMaintenance",
  "outsideSafeTemperatureRange",
  "outsideSafeHumidityRange",
  "hardwareFailure",
];

/**
 * Returns the canonical notifications a device can emit, derived from its
 * shape. Replaces the legacy `device.supportedNotifications[]` reads — driver
 * implementations no longer need to declare this list.
 */
export function inferDeviceNotifications(
  device: InferDeviceNotificationsInput | null | undefined,
): DeviceNotificationName[] {
  if (!device || !device.type) return [];
  const set = new Set<DeviceNotificationName>();

  if ("offline" in device) set.add("communicationFailure");

  if ("batteryLevel" in device && device.batteryLevel != null) {
    set.add("replaceBattery");
  }

  if ("bellTrouble" in device) set.add("bellTrouble");
  if ("monitoringTrouble" in device) set.add("monitoringTrouble");
  if ("powerLevel" in device) set.add("powerTrouble");

  if ("equipment" in device) set.add("hardwareFailure");

  switch (device.type) {
    case "thermostat":
      for (const n of THERMOSTAT_INFERRED) set.add(n);
      break;
    default:
      break;
  }

  return Array.from(set);
}
