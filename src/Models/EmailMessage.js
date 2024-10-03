// Create the SMS Message Model
import schema, { properties } from "../schemas/emailMessage.json";
import { add, compile } from "../utils/schema";
import { Entity } from "./Entity";

add(schema);
const validator = compile(schema);

export class EmailMessage extends Entity {
  /**
   * @typedef {import("../schemas/EmailMessageSchema").EmailMessage} EmailMessageType
   * Create a EmailMessage instance.
   * @constructor
   * @param {EmailMessageType} message - The message object of type EmailMessage.
   */
  constructor(message) {
    super(message);
  }
}

Object.defineProperty(EmailMessage.prototype, "schema", {
  value: schema,
});

Object.defineProperty(EmailMessage.prototype, "validator", {
  get: function () {
    return validator;
  },
});

Object.defineProperty(EmailMessage, "validProperties", {
  value: Object.keys(properties),
});
