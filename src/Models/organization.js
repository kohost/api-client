const schemas = require("../utils/schema");
const schema = require("../schemas/organization.json");
const Kohost = require("./kohost");

schemas.add(schema);
const validator = schemas.compile(schema);

class Organization extends Kohost {
  constructor(data) {
    super(data);
  }
}

Object.defineProperty(Organization.prototype, "schema", {
  value: schema,
});

Object.defineProperty(Organization.prototype, "validator", {
  get: function () {
    return validator;
  },
});

Object.defineProperty(Organization, "validProperties", {
  value: Object.keys(schema.properties),
});

module.exports = Organization;
