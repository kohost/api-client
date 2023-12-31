import { registerSchema, compileSchema } from "../utils/schema";
import { schema, type OrganizationSchema } from "../schemas/organization.json";
import Entity from "./Entity";

registerSchema(schema);

interface Organization extends OrganizationSchema {}

class Organization extends Entity {
  constructor(organization: OrganizationSchema) {
    super(organization);
  }
}

Organization.validator = compileSchema(schema);
Organization.schema = schema;
Organization.validProperties = Object.keys(schema.properties);

export default Organization;
