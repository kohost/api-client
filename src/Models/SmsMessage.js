// Create the SMS Message Model
import schema, { properties } from "../schemas/smsMessage.json";
import { add, compile } from "../utils/schema";
import { Entity } from "./Entity";

add(schema);
const validator = compile(schema);

export class SMSMessage extends Entity {
  /**
   * @typedef {import("../schemas/SmsMessageSchema").SmsMessage} SmsMessageType
   * Create a SmsMessage instance.
   * @constructor
   * @param {SmsMessageType} message - The message object of type SmsMessage.
   */
  constructor(message) {
    super(message);
  }
}

Object.defineProperty(SMSMessage.prototype, "schema", {
  value: schema,
});

Object.defineProperty(SMSMessage.prototype, "validator", {
  get: function () {
    return validator;
  },
});

Object.defineProperty(SMSMessage, "validProperties", {
  value: Object.keys(properties),
});
