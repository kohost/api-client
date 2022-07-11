// create the Alarm Model
const motionSchema = require("../schemas/motionSensor.json");
const { createIotModel } = require("../utils/iot");

const MotionSensor = createIotModel({
  schema: motionSchema,
  name: "Motion Sensor",
  generateGenerics: false,
});

module.exports = MotionSensor;
