// Create the Lock Model
const { createIotModel } = require("../utils/iot");
const lockSchema = require("../schemas/lock.json");

const Lock = createIotModel({
  schema: lockSchema,
  name: "Lock",
  settableProps: ["state"],
});

module.exports = Lock;
