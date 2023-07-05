// Create the SMS Message Model
const schemas = require("../utils/schema");
const schema = require("../schemas/emailMessage.json");
const Kohost = require("./kohost");

schemas.add(schema);
const validator = schemas.compile(schema);

class EmailMessage extends Kohost {
  constructor(data) {
    super(data);
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
