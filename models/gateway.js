// Create the Gateway Model
const { createIotModel } = require("../utils/iot");
const gatewaySchema = require("../schemas/gateway.json");

const Gateway = createIotModel({
  schema: gatewaySchema,
  name: "Gateway",
  generateGenerics: false,
});

module.exports = Gateway;
