// Create the Device Router Model
import schema, { properties } from "../schemas/deviceRouter.json";
import { add, compile } from "../utils/schema";

import { Entity } from "./Entity";

add(schema);
const validator = compile(schema);

export class DeviceRouter extends Entity {
  /**
   * @typedef {import("../schemas/DeviceRouterSchema").DeviceRouter} DeviceRouterType
   * Create a DeviceRouter instance.
   * @constructor
   * @param {DeviceRouterType} device - The device object of type DeviceRouter.
   */
  constructor(device) {
    super(device);
  }
}

Object.defineProperty(DeviceRouter.prototype, "schema", {
  value: schema,
});

Object.defineProperty(DeviceRouter.prototype, "validator", {
  get: function () {
    return validator;
  },
});

Object.defineProperty(DeviceRouter, "validProperties", {
  value: Object.keys(properties),
});
