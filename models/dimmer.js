// Create the Dimmer Model
const { createModel } = require("../utils/compiler");
const dimmerSchema = require("../schemas/dimmer.json");

const Dimmer = createModel({ schema: dimmerSchema, name: "Dimmer" });

module.exports = Dimmer;
