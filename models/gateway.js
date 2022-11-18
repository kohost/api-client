// Create the Gateway Model
const schemas = require("../utils/schema");
const schema = require("../schemas/gateway.json");
const Kohost = require("./kohost");

schemas.add(schema);
const validator = schemas.compile(schema);

const { customAlphabet } = require("nanoid/async");
const characters =
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"; 

class Gateway extends Kohost {
  constructor(data) {
    super(data);
  }

  static async generateAuthKey(length = 64) {
    return await customAlphabet(characters, length)();
  }
}

Object.defineProperty(Gateway.prototype, "schema", {
  value: schema,
});

Object.defineProperty(Gateway.prototype, "validator", {
  get: function () {
    return validator;
  },
});

Object.defineProperty(Gateway, "validProperties", {
  value: Object.keys(schema.properties),
});

module.exports = Gateway;
