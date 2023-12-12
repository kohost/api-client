// Create the SMS Message Model
import { add, compile } from "../utils/schema";
import schema, { properties } from "../schemas/smsMessage.json";
import Entity from "./Entity";

add(schema);
const validator = compile(schema);

type SMSMessageType = import("../types/SmsMessageSchema").SMSMessage;

class SMSMessage extends Entity {
  constructor(message: SMSMessageType) {
    super(message);
  }

  schema = schema;
  validator = validator;
  validProperties = Object.keys(properties);
}

export default SMSMessage;
