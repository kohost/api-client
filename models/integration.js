// Create the Driver Model
const schemas = require("../utils/schema");
const schema = require("../schemas/integration.json");
const Kohost = require("./kohost");

schemas.add(schema);
const validator = schemas.compile(schema);
class Integration extends Kohost {
  constructor(data) {
    super(data);
  }
  getDriverDeviceId(kohostDeviceId) {
    return this.data?.deviceMap && this.data.deviceMap[kohostDeviceId]?.id;
  }

  get deviceMap() {
    return new Map(Object.entries(this.data?.deviceMap || {}));
  }
}

Object.defineProperty(Integration.prototype, "schema", {
  value: schema,
});

Object.defineProperty(Integration.prototype, "validator", {
  get: function () {
    return validator;
  },
});

Object.defineProperty(Integration, "validProperties", {
  value: Object.keys(schema.properties),
});

module.exports = Integration;
