// create the Alarm Model
const schemas = require("../utils/schema");
const schema = require("../schemas/alarm.json");
const Kohost = require("./Kohost");

schemas.add(schema);
const validator = schemas.compile(schema);

class Alarm extends Kohost {
  constructor(data) {
    super(data);
  }
}

Object.defineProperty(Alarm.prototype, "schema", {
  value: schema,
});

Object.defineProperty(Alarm.prototype, "validator", {
  get: function () {
    return validator;
  },
});

Object.defineProperty(Alarm, "validProperties", {
  value: Object.keys(schema.properties),
});

module.exports = Alarm;
