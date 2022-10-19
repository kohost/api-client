// Create the Discovered Device Model
const schemas = require("../utils/schema");
const schema = require("../schemas/discoveredDevice.json");

const Kohost = require("./kohost");

schemas.add(schema);
const validator = schemas.compile(schema);

class DiscoveredDevice extends Kohost {
  constructor(data) {
    super(data);
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
