// Create the SMS Message Model
const schemas = require("../utils/schema");
const schema = require("../schemas/smsMessage.json");
const Kohost = require("./Kohost");

schemas.add(schema);
const validator = schemas.compile(schema);

class SMSMessage extends Kohost {
  constructor(data) {
    super(data);
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
