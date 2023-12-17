// Create the SMS Message Model
import { add, compile } from "../utils/schema";
import schema, { properties } from "../schemas/smsMessage.json";
import Entity from "./Entity";

add(schema);
const validator = compile(schema);

type SMSMessageSchema = import("../types/SmsMessageSchema").SMSMessageSchema;

class SMSMessage extends Entity {
  constructor(message: SMSMessageSchema) {
    super(message);
  }

  schema = schema;
  validator = validator;
  validProperties = Object.keys(properties);
}

export default SMSMessage;
