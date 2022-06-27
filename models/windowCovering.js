// Create the WindowCovering Model
const { createModel } = require("../utils/compiler");
const windowCoveringSchema = require("../schemas/windowCovering.json");

const WindowCovering = createModel({
  schema: windowCoveringSchema,
  name: "WindowCovering",
});

module.exports = WindowCovering;
