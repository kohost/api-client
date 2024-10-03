import { deviceTypes } from "./deviceTypes";
export const formalDeviceTypes = deviceTypes.map(
  (type) => type.charAt(0).toUpperCase() + type.slice(1),
);
