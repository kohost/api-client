const schemas = require("../utils/schema");
const schema = require("../schemas/identification.json");
const Kohost = require("./kohost");

schemas.add(schema);
const validator = schemas.compile(schema);

class Identification extends Kohost {
  constructor(data) {
    super(data);
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
