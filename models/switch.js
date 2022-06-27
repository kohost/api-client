// create the Switch model
const { createModel } = require("../utils/compiler");
const switchSchema = require("../schemas/switch.json");

const Switch = createModel({ schema: switchSchema, name: "Switch" });

module.exports = Switch;
