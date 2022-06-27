// create the Courtesy Model
const courtesySchema = require("../schemas/courtesy.json");
const { createIotModel } = require("../utils/iot");

const Courtesy = createIotModel({
  schema: courtesySchema,
  name: "Courtesy",
  settableProps: ["state"],
});

module.exports = Courtesy;
