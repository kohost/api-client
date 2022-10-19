// Create the WindowCovering Model
const schemas = require("../utils/schema");
const schema = require("../schemas/windowCovering.json");
const Kohost = require("./kohost");

schemas.add(schema);
const validator = schemas.compile(schema);

class WindowCovering extends Kohost {
  constructor(data) {
    super(data);
  }
}

Object.defineProperty(WindowCovering.prototype, "schema", {
  value: schema,
});

Object.defineProperty(WindowCovering.prototype, "validator", {
  get: function () {
    return validator;
  },
});

Object.defineProperty(WindowCovering, "validProperties", {
  value: Object.keys(schema.properties),
});

module.exports = WindowCovering;
