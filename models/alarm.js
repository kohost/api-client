// create the Alarm Model
const { createModel } = require("../utils/compiler");
const alarmSchema = require("../schemas/alarm.json");

const Alarm = createModel({ schema: alarmSchema, name: "Alarm" });

module.exports = Alarm;
