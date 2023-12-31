// Create the SMS Message Model
import { registerSchema, compileSchema } from "../utils/schema";
import { schema, type SMSMessageSchema } from "../schemas/smsMessage.json";
import Entity from "./Entity";

registerSchema(schema);

interface SMSMessage extends SMSMessageSchema {}

class SMSMessage extends Entity {
  constructor(message: SMSMessageSchema) {
    super(message);
  }
}

SMSMessage.validator = compileSchema(schema);
SMSMessage.schema = schema;
SMSMessage.validProperties = Object.keys(schema.properties);

export default SMSMessage;
