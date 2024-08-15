import { FromSchema } from "json-schema-to-ts";
import { definitionsSchema } from "../schemas/definitions";
import { createValidator, registerSchema } from "../utils/validation";
import { lockSchema } from "./../schemas/lock";
import { Entity } from "./Entity";

registerSchema(lockSchema);
const validator = createValidator(lockSchema);

export type LockSchema = FromSchema<
  typeof lockSchema,
  { references: [typeof definitionsSchema] }
>;

export class Lock extends Entity<LockSchema> {
  static schema = lockSchema;
  static actionProperties: ["state"];
  validator = validator;
}
