// Create the SMS Message Model
import { registerSchema, compileSchema } from "../utils/schema";
import { schema, type EmailMessageSchema } from "../schemas/emailMessage.json";
import Entity from "./Entity";

registerSchema(schema);

interface EmailMessage extends EmailMessageSchema {}

class EmailMessage extends Entity {
  constructor(message: EmailMessageSchema) {
    super(message);
  }
}

EmailMessage.validator = compileSchema(schema);
EmailMessage.schema = schema;
EmailMessage.validProperties = Object.keys(schema.properties);

export default EmailMessage;
