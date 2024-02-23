const schemas = require("../utils/schema");
const schema = require("../schemas/policy.json");
const Entity = require("./Entity");

schemas.add(schema);
const validator = schemas.compile(schema);

class Policy extends Entity {
  /**
   * @typedef {import("../schemas/PolicySchema").Policy} PolicyType
   * Create a Permission Policy instance.
   * @constructor
   * @param {PolicyType} policy - The policy object of type PolicyType.
   */
  constructor(policy) {
    super(policy);
  }
}

Object.defineProperty(Policy.prototype, "schema", {
  value: schema,
});

Object.defineProperty(Policy.prototype, "validator", {
  get: function () {
    return validator;
  },
});

Object.defineProperty(Policy, "validProperties", {
  value: Object.keys(schema.properties),
});

module.exports = Policy;
