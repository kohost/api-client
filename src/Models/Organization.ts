import { add, compile } from "../utils/schema";
import schema, { properties } from "../schemas/organization.json";
import Entity from "./Entity";

import { OrganizationSchema } from "../types/OrganizationSchema";

add(schema);
const validator = compile(schema);

class Organization extends Entity {
  constructor(organization: OrganizationSchema) {
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
