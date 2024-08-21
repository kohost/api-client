import { definitionsSchema } from "../schemas/definitions";

type Capitalize<T extends string> = T extends `${infer First}${infer Rest}`
  ? `${Uppercase<First>}${Rest}`
  : T;

export type Driver = (typeof definitionsSchema.definitions.driver.enum)[number];

export type DeviceType =
  (typeof definitionsSchema.definitions.deviceEntity.enum)[number];

// entity is the merging of unions of the defs.entity and DeviceType
export type Entity =
  | DeviceType
  | (typeof definitionsSchema.definitions.entity.enum)[number];

export type Notification =
  (typeof definitionsSchema.definitions.supportedNotifications.items.enum)[number];

export interface Context {
  organizationId?: string;
  propertyId?: string;
  deviceId?: string;
  deviceType?: DeviceType;
  driver?: Driver;
  [key: string]: any;
}

export const deviceTypes: DeviceType[] = [
  "dimmer",
  "switch",
  "thermostat",
  "lock",
  "windowCovering",
  "courtesy",
  "alarm",
  "camera",
  "mediaSource",
  "motionSensor",
  "gateway",
];

type DeviceTypeCapitalized = Capitalize<DeviceType>;

export const formalDeviceTypes = deviceTypes.map((deviceType) => {
  return deviceType.charAt(0).toUpperCase() + deviceType.slice(1);
}) as DeviceTypeCapitalized[];

export * as amqp from "./amqpExchanges";
