// create the Alarm Model
const alarmSchema = require("../schemas/alarm.json");
const { createIotModel } = require("../utils/iot");

const Alarm = createIotModel({
  schema: alarmSchema,
  name: "Alarm",
  generateGenerics: false,
});

module.exports = Alarm;
