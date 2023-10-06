// Create the Discovered Device Model
const schemas = require("../utils/schema");
const schema = require("../schemas/discoveredDevice.json");

const Entity = require("./Entity");

schemas.add(schema);
const validator = schemas.compile(schema);

class DiscoveredDevice extends Entity {
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
  value: Object.keys(schema.properties),
});

module.exports = DiscoveredDevice;
