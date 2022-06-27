// Create the Gateway Model
const { createModel } = require("../utils/compiler");
const gatewaySchema = require("../schemas/gateway.json");

const Gateway = createModel({ schema: gatewaySchema, name: "Gateway" });

module.exports = Gateway;
