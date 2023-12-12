import { add, compile } from "../utils/schema";
import schema, { properties } from "../schemas/organization.json";
import Entity from "./Entity";

add(schema);
const validator = compile(schema);

type OrganizationType = import("../types/OrganizationSchema").Organization;

class Organization extends Entity {
  constructor(organization: OrganizationType) {
    super(organization);
  }

  schema = schema;
  validator = validator;
  validProperties = Object.keys(properties);
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
  value: Object.keys(properties),
});

export default Organization;
