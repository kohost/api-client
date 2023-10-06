const schemas = require("../utils/schema");
const schema = require("../schemas/thermostat.json");
const Entity = require("./Entity");

schemas.add(schema);
const validator = schemas.compile(schema);

class Thermostat extends Entity {
  /**
   * @typedef {import("../schemas/ThermostatSchema").Thermostat} ThermostatType
   * Create a Thermostat instance.
   * @constructor
   * @param {ThermostatType} thermostat - The thermostat object of type Thermostat.
   */
  constructor(thermostat) {
    super(thermostat);
  }

  toCelsius() {
    if (this.temperatureScale === "fahrenheit")
      this.currentTemperature = ((this.currentTemperature - 32) * 5) / 9;
    this.temperatureScale = "celsius";
    return this.currentTemperature;
  }

  toFahrenheit() {
    if (this.temperatureScale === "celsius")
      this.currentTemperature = (this.currentTemperature * 9) / 5 + 32;
    this.temperatureScale = "fahrenheit";
    return this.currentTemperature;
  }

  static getActionDelta(old, _new) {
    const delta = {};
    for (const action in _new) {
      if (this.actionProperties.includes(action)) {
        switch (action) {
          case "hvacMode":
          case "fanMode": {
            if (old[action] !== _new[action]) delta[action] = 1;
            break;
          }
          case "setpoints": {
            const setpoints = _new[action];
            for (const setpoint in setpoints) {
              if (old[action][setpoint].value !== setpoints[setpoint].value) {
                const min =
                  setpoints[setpoint].min || old[action][setpoint].min;
                const max =
                  setpoints[setpoint].max || old[action][setpoint].max;
                const oldValue = old[action][setpoint].value;
                const value = setpoints[setpoint].value;
                // get percentage change relative to min and max
                const percentChange = (value - oldValue) / (max - min);
                // get the delta
                delta[`setpoints.${setpoint}`] = percentChange;
              }
            }
          }
        }
      }
    }

    return delta;
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

Object.defineProperty(Thermostat, "actionProperties", {
  value: ["hvacMode", "fanMode", "setpoints"],
});

module.exports = Thermostat;
