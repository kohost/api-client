import { FromSchema } from "json-schema-to-ts";
import { definitionsSchema } from "../schemas/definitions";
import { paymentSchema } from "../schemas/payment";
import { createValidator, registerSchema } from "../utils/validation";
import { systemUserSchema } from "./../schemas/systemUser";
import { Entity } from "./Entity";

registerSchema(definitionsSchema);
registerSchema(paymentSchema);
registerSchema(systemUserSchema);
const validator = createValidator(systemUserSchema);

export type SystemUserSchema = FromSchema<
  typeof systemUserSchema,
  { references: [typeof definitionsSchema, typeof paymentSchema] }
>;

export class SystemUser extends Entity<SystemUserSchema> {
  static schema = systemUserSchema;
  validator = validator;
}

export default SystemUser;
