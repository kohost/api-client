const { createModel } = require("../utils/compiler");
const thermostatSchema = require("../schemas/thermostat.json");

function toCelsius() {
  if (this.temperatureScale === "farenheit")
    this.currentTemperature = ((this.currentTemperature - 32) * 5) / 9;
  this.temperatureScale = "celsius";
  return this.currentTemperature;
}

function toFarenheit() {
  if (this.temperatureScale === "celsius")
    this.currentTemperature = (this.currentTemperature * 9) / 5 + 32;
  this.temperatureScale = "farenheit";
  return this.currentTemperature;
}

const Thermostat = createModel({
  schema: thermostatSchema,
  name: "Thermostat",
  methods: [toCelsius, toFarenheit],
});

module.exports = Thermostat;
