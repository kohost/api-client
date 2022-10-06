// Create the Gateway Model
const { createIotModel } = require("../utils/iot");
const iotGatewaySchema = require("../schemas/iotGateway.json");

const Gateway = createIotModel({
  schema: iotGatewaySchema,
  name: "IoT Gateway",
  generateGenerics: false,
});

module.exports = Gateway;
