const schemas = require("../utils/schema");
const schema = require("../schemas/thermostat.json");
const Kohost = require("./kohost");

schemas.add(schema);
const validator = schemas.compile(schema);

class Thermostat extends Kohost {
  constructor(data) {
    super(data);
  }

  toCelsius() {
    if (this.temperatureScale === "farenheit")
      this.currentTemperature = ((this.currentTemperature - 32) * 5) / 9;
    this.temperatureScale = "celsius";
    return this.currentTemperature;
  }

  toFarenheit() {
    if (this.temperatureScale === "celsius")
      this.currentTemperature = (this.currentTemperature * 9) / 5 + 32;
    this.temperatureScale = "farenheit";
    return this.currentTemperature;
  }
}

Object.defineProperty(Thermostat.prototype, "schema", {
  value: schema,
});

Object.defineProperty(Thermostat.prototype, "validator", {
  get: function () {
    return validator;
  },
});

Object.defineProperty(Thermostat, "validProperties", {
  value: Object.keys(schema.properties),
});

module.exports = Thermostat;
