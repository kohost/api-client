// Create the Gateway Model
const { createModel } = require("../utils/compiler");
const gatewaySchema = require("../schemas/gateway.json");
const { customAlphabet } = require("nanoid/async");
const characters =
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

async function generateAuthKey(length = 64) {
  return await customAlphabet(characters, length)();
}

const Gateway = createModel({
  schema: gatewaySchema,
  name: "Gateway",
  statics: [generateAuthKey],
});

module.exports = Gateway;
