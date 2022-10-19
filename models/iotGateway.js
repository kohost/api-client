// Create the Gateway Model
const schemas = require("../utils/schema");
const schema = require("../schemas/iotGateway.json");
const Kohost = require("./kohost");

schemas.add(schema);
const validator = schemas.compile(schema);

class IotGateway extends Kohost {
  constructor(data) {
    super(data);
  }
}

Object.defineProperty(IotGateway.prototype, "schema", {
  value: schema,
});

Object.defineProperty(IotGateway.prototype, "validator", {
  get: function () {
    return validator;
  },
});

Object.defineProperty(IotGateway, "validProperties", {
  value: Object.keys(schema.properties),
});

module.exports = IotGateway;
