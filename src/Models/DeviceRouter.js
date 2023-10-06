// Create the Device Router Model
const schemas = require("../utils/schema");
const schema = require("../schemas/deviceRouter.json");

const Entity = require("./Entity");

schemas.add(schema);
const validator = schemas.compile(schema);

class DeviceRouter extends Entity {
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
  value: Object.keys(schema.properties),
});

module.exports = DeviceRouter;
