// Create the SMS Message Model
const schemas = require("../utils/schema");
const schema = require("../schemas/smsMessage.json");
const Entity = require("./Entity");

schemas.add(schema);
const validator = schemas.compile(schema);

class SMSMessage extends Entity {
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
  value: Object.keys(schema.properties),
});

module.exports = SMSMessage;
