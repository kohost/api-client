import { add, compile } from "../utils/schema";
import schema, { properties } from "../schemas/thermostat.json";
import Entity from "./Entity";
import { ThermostatSchema } from "../types/ThermostatSchema";

add(schema);
const validator = compile(schema);

class Thermostat extends Entity {
  constructor(thermostat: ThermostatSchema) {
    super(thermostat);
  }

  schema = schema;
  validator = validator;
  validProperties = Object.keys(properties);

  get actionProperties() {
    return ["hvacMode", "fanMode", "setpoints"];
  }

  toCelsius(): number {
    if (this.temperatureScale === "fahrenheit")
      this.currentTemperature = ((this.currentTemperature - 32) * 5) / 9;
    this.temperatureScale = "celsius";
    return this.currentTemperature;
  }

  toFahrenheit(): number {
    if (this.temperatureScale === "celsius")
      this.currentTemperature = (this.currentTemperature * 9) / 5 + 32;
    this.temperatureScale = "fahrenheit";
    return this.currentTemperature;
  }

  static getActionDelta(old: any, _new: any) {
    const delta = {} as any;
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

export default Thermostat;
