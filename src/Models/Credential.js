// create the Credential Model
const schemas = require("../utils/schema");
const schema = require("../schemas/credential.json");
const Entity = require("./Entity");

schemas.add(schema);
const validator = schemas.compile(schema);

class Credential extends Entity {
  /**
   * @typedef {import("../schemas/CredentialSchema").Credential} CredentialType
   * Create a Credential instance.
   * @constructor
   * @param {CredentialType} credential - The credential object of type Credential.
   */
  constructor(credential) {
    super(credential);
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
