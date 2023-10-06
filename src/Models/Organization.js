const schemas = require("../utils/schema");
const schema = require("../schemas/organization.json");
const Entity = require("./Entity");

schemas.add(schema);
const validator = schemas.compile(schema);

class Organization extends Entity {
  /**
   * @typedef {import("../schemas/OrganizationSchema").Organization} OrganizationType
   * Create a Organization instance.
   * @constructor
   * @param {OrganizationType} organization - The organization object of type Organization.
   */
  constructor(organization) {
    super(organization);
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
