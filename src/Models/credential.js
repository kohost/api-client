// create the Credential Model
const schemas = require("../utils/schema");
const schema = require("../schemas/credential.json");
const Kohost = require("./Kohost");

schemas.add(schema);
const validator = schemas.compile(schema);

class Credential extends Kohost {
  constructor(data) {
    super(data);
  }
}

Object.defineProperty(Credential.prototype, "schema", {
  value: schema,
});

Object.defineProperty(Credential.prototype, "validator", {
  get: function () {
    return validator;
  },
});

Object.defineProperty(Credential, "validProperties", {
  value: Object.keys(schema.properties),
});

module.exports = Credential;
