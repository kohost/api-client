// Create the Device Router Model
const schemas = require("../utils/schema");
const schema = require("../schemas/deviceRouter.json");

const Kohost = require("./Kohost");

schemas.add(schema);
const validator = schemas.compile(schema);

class DeviceRouter extends Kohost {
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
