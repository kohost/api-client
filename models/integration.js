// Create the Driver Model
const { createModel } = require("../utils/compiler");
const integrationSchema = require("../schemas/integration.json");

const Integration = createModel({
  schema: integrationSchema,
  name: "Integration",
});

module.exports = Integration;
