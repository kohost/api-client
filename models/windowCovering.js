// Create the WindowCovering Model
const { createIotModel } = require("../utils/iot");
const windowCoveringSchema = require("../schemas/windowCovering.json");

const WindowCovering = createIotModel({
  schema: windowCoveringSchema,
  name: "WindowCovering",
  settableProps: ["position"],
});

module.exports = WindowCovering;
