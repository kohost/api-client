import { FromSchema } from "json-schema-to-ts";
import { definitionsSchema } from "../schemas/definitions";
import { createValidator, registerSchema } from "../utils/validation";
import { organizationSchema } from "./../schemas/organization";
import { Entity } from "./Entity";

registerSchema(organizationSchema);
const validator = createValidator(organizationSchema);

export type OrganizationSchema = FromSchema<
  typeof organizationSchema,
  { references: [typeof definitionsSchema] }
>;

export class Organization extends Entity<OrganizationSchema> {
  static schema = organizationSchema;
  validator = validator;

  constructor(data: OrganizationSchema) {
    super(data);
  }
}
