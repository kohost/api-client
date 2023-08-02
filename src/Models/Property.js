const schemas = require("../utils/schema");
const schema = require("../schemas/property.json");
const Kohost = require("./Kohost");

schemas.add(schema);
const validator = schemas.compile(schema);

class Property extends Kohost {
  /**
   * @typedef {import("../schemas/PropertySchema").Property} PropertyType
   * Create a Property instance.
   * @constructor
   * @param {PropertyType} property - The property object of type Property.
   */
  constructor(property) {
    super(property);
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
