// Create the SMS Message Model
import { add, compile } from "../utils/schema";
import schema, { properties } from "../schemas/emailMessage.json";
import Entity from "./Entity";

add(schema);
const validator = compile(schema);

type EmailMessageSchema =
  import("../types/EmailMessageSchema").EmailMessageSchema;

class EmailMessage extends Entity {
  constructor(message: EmailMessageSchema) {
    super(message);
  }

  schema = schema;
  validator = validator;
  validProperties = Object.keys(properties);
}

export default EmailMessage;
