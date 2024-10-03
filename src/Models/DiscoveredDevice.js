// Create the Discovered Device Model
import schema, { properties } from "../schemas/discoveredDevice.json";
import { add, compile } from "../utils/schema";

import { Entity } from "./Entity";

add(schema);
const validator = compile(schema);

export class DiscoveredDevice extends Entity {
  /**
   * @typedef {import("../schemas/DiscoveredDeviceSchema").DiscoveredDevice} DiscoveredDeviceType
   * Create a DiscoveredDevice instance.
   * @constructor
   * @param {DiscoveredDeviceType} device - The dd object of type DiscoveredDevice.
   */
  constructor(device) {
    super(device);
  }
}

Object.defineProperty(DiscoveredDevice.prototype, "schema", {
  value: schema,
});

Object.defineProperty(DiscoveredDevice.prototype, "validator", {
  get: function () {
    return validator;
  },
});

Object.defineProperty(DiscoveredDevice, "validProperties", {
  value: Object.keys(properties),
});
