const schemas = require("../utils/schema");
const schema = require("../schemas/identification.json");
const Entity = require("./Entity");

schemas.add(schema);
const validator = schemas.compile(schema);

class Identification extends Entity {
  /**
   * @typedef {import("../schemas/IdentificationSchema").Identification} IdentificationType
   * Create a Identification instance.
   * @constructor
   * @param {IdentificationType} identification - The identification object of type Identification.
   */
  constructor(identification) {
    super(identification);
  }

  get isExpired() {
    return new Date(this.expires) < new Date();
  }
}

Object.defineProperty(Identification.prototype, "schema", {
  value: schema,
});

Object.defineProperty(Identification.prototype, "validator", {
  get: function () {
    return validator;
  },
});

Object.defineProperty(Identification, "validProperties", {
  value: Object.keys(schema.properties),
});

module.exports = Identification;
