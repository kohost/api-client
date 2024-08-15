import { FromSchema } from "json-schema-to-ts";
import { definitionsSchema } from "../schemas/definitions";
import { createValidator, registerSchema } from "../utils/validation";
import { policySchema } from "./../schemas/policy";
import { Entity } from "./Entity";

registerSchema(policySchema);
const validator = createValidator(policySchema);

export type PolicySchema = FromSchema<
  typeof policySchema,
  { references: [typeof definitionsSchema] }
>;

export class Policy extends Entity<PolicySchema> {
  static schema = policySchema;
  validator = validator;
}
