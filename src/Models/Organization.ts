import { add, compile } from "../utils/schema";
import schema, { properties } from "../schemas/organization.json";
import Entity from "./Entity";

add(schema);
const validator = compile(schema);

type OrganizationSchema =
  import("../types/OrganizationSchema").OrganizationSchema;

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
