// Create the Gateway Model
const schemas = require("../utils/schema");
const schema = require("../schemas/gateway.json");
const Kohost = require("./kohost");

schemas.add(schema);
const validator = schemas.compile(schema);

class Gateway extends Kohost {
  constructor(data) {
    super(data);
  }
}

Object.defineProperty(Gateway.prototype, "schema", {
  value: schema,
});

Object.defineProperty(Gateway.prototype, "validator", {
  get: function () {
    return validator;
  },
});

Object.defineProperty(Gateway, "validProperties", {
  value: Object.keys(schema.properties),
});

module.exports = Gateway;
