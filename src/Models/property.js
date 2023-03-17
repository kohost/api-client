const schemas = require("../utils/schema");
const schema = require("../schemas/property.json");
const Kohost = require("./kohost");

schemas.add(schema);
const validator = schemas.compile(schema);

class Property extends Kohost {
  constructor(data) {
    super(data);
  }
}

Object.defineProperty(Property.prototype, "schema", {
  value: schema,
});

Object.defineProperty(Property.prototype, "validator", {
  get: function () {
    return validator;
  },
});

Object.defineProperty(Property, "validProperties", {
  value: Object.keys(schema.properties),
});

module.exports = Property;
