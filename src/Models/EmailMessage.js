// Create the SMS Message Model
const schemas = require("../utils/schema");
const schema = require("../schemas/emailMessage.json");
const Entity = require("./Entity");

schemas.add(schema);
const validator = schemas.compile(schema);

class EmailMessage extends Entity {
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
  value: Object.keys(schema.properties),
});

module.exports = EmailMessage;
