// Create the Dimmer Model
const schemas = require("../utils/schema");
const schema = require("../schemas/dimmer.json");
const Kohost = require("./kohost");

schemas.add(schema);
const validator = schemas.compile(schema);

class Dimmer extends Kohost {
  constructor(data) {
    super(data);
  }
}

Object.defineProperty(Dimmer.prototype, "schema", {
  value: schema,
});

Object.defineProperty(Dimmer.prototype, "validator", {
  get: function () {
    return validator;
  },
});

Object.defineProperty(Dimmer, "validProperties", {
  value: Object.keys(schema.properties),
});

module.exports = Dimmer;
