import { FromSchema } from "json-schema-to-ts";
import { definitionsSchema } from "../schemas/definitions";
import { createValidator, registerSchema } from "../utils/validation";
import { emailMessageSchema } from "./../schemas/emailMessage";
import { Entity } from "./Entity";

registerSchema(emailMessageSchema);
const validator = createValidator(emailMessageSchema);

export type EmailMessageSchema = FromSchema<
  typeof emailMessageSchema,
  { references: [typeof definitionsSchema] }
>;

export class EmailMessage extends Entity<EmailMessageSchema> {
  static schema = emailMessageSchema;
  validator = validator;
}

export default EmailMessage;
