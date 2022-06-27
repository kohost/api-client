// Create the Dimmer Model
const dimmerSchema = require("../schemas/dimmer.json");
const { createIotModel } = require("../utils/iot");

const Dimmer = createIotModel({
  schema: dimmerSchema,
  name: "Dimmer",
  settableProps: ["level"],
});

module.exports = Dimmer;
