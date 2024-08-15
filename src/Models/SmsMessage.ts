import { FromSchema } from "json-schema-to-ts";
import { definitionsSchema } from "../schemas/definitions";
import { createValidator, registerSchema } from "../utils/validation";
import { smsMessageSchema } from "./../schemas/smsMessage";
import { Entity } from "./Entity";

registerSchema(smsMessageSchema);
const validator = createValidator(smsMessageSchema);

export type SmsMessageSchema = FromSchema<
  typeof smsMessageSchema,
  { references: [typeof definitionsSchema] }
>;

export class SmsMessage extends Entity<SmsMessageSchema> {
  static schema = smsMessageSchema;
  validator = validator;
}
