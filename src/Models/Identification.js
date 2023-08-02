const schemas = require("../utils/schema");
const schema = require("../schemas/identification.json");
const Kohost = require("./Kohost");

schemas.add(schema);
const validator = schemas.compile(schema);

class Identification extends Kohost {
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
    return new Date(this.expirationDate) < new Date();
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
