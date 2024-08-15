import { FromSchema } from "json-schema-to-ts";
import { definitionsSchema } from "../schemas/definitions";
import { createValidator, registerSchema } from "../utils/validation";
import { systemUserSchema } from "./../schemas/systemUser";
import { Entity } from "./Entity";

registerSchema(systemUserSchema);
const validator = createValidator(systemUserSchema);

export type SystemUserSchema = FromSchema<
  typeof systemUserSchema,
  { references: [typeof definitionsSchema] }
>;

export class SystemUser extends Entity<SystemUserSchema> {
  static schema = systemUserSchema;
  validator = validator;
}
