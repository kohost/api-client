// Create the Gateway Model
const schemas = require("../utils/schema");
const schema = require("../schemas/gateway.json");
const Entity = require("./Entity");

schemas.add(schema);
const validator = schemas.compile(schema);

class Gateway extends Entity {
  /**
   * @typedef {import("../schemas/GatewaySchema").Gateway} GatewayType
   * Create a Gateway instance.
   * @constructor
   * @param {GatewayType} gateway - The gateway object of type Gateway.
   */
  constructor(gateway) {
    super(gateway);
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
