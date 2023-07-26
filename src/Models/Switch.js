// create the Switch model
const schemas = require("../utils/schema");
const schema = require("../schemas/switch.json");
const Kohost = require("./Kohost");

schemas.add(schema);
const validator = schemas.compile(schema);

class Switch extends Kohost {
  /**
   * @typedef {import("../schemas/SwitchSchema").Switch} SwitchType
   * Create a Switch instance.
   * @constructor
   * @param {SwitchType} _switch - The _switch object of type Switch.
   */
  constructor(_switch) {
    super(_switch);
  }
}

Object.defineProperty(Switch.prototype, "schema", {
  value: schema,
});

Object.defineProperty(Switch.prototype, "validator", {
  get: function () {
    return validator;
  },
});

Object.defineProperty(Switch, "validProperties", {
  value: Object.keys(schema.properties),
});

Object.defineProperty(Switch, "actionProperties", {
  value: ["state"],
});

module.exports = Switch;
