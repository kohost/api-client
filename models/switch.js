// create the Switch model
const { createIotModel } = require("../utils/iot");
const switchSchema = require("../schemas/switch.json");

const Switch = createIotModel({
  schema: switchSchema,
  name: "Switch",
  settableProps: ["state"],
});

module.exports = Switch;
