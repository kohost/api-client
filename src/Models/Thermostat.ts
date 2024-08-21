import { FromSchema } from "json-schema-to-ts";
import { definitionsSchema } from "../schemas/definitions";
import { thermostatSchema } from "../schemas/thermostat";
import { Entity } from "./Entity";

import * as schemaUtils from "../utils/validation";

schemaUtils.registerSchema(thermostatSchema);
const validator = schemaUtils.createValidator(thermostatSchema);

export type ThermostatSchema = FromSchema<
  typeof thermostatSchema,
  { references: [typeof definitionsSchema] }
>;

export class Thermostat extends Entity<ThermostatSchema> {
  static schema = thermostatSchema;
  static actionProperties = ["hvacMode", "fanMode", "setpoints"];
  validator = validator;

  static getActionDelta(
    old: ThermostatSchema,
    _new: ThermostatSchema
  ): { [key: string]: number } {
    const delta = {} as { [key: string]: number };
    for (const action in _new) {
      if (this.actionProperties.includes(action)) {
        switch (action) {
          case "hvacMode":
          case "fanMode": {
            if (old[action] !== _new[action]) delta[action] = 1;
            break;
          }
          case "setpoints": {
            const newSetpoints = _new[action];
            const oldSetpoints = old[action];
            for (const setpoint in newSetpoints) {
              switch (setpoint) {
                case "cool":
                case "heat":
                case "auto": {
                  if (oldSetpoints[setpoint] && newSetpoints[setpoint]) {
                    if (
                      oldSetpoints[setpoint].value !==
                      newSetpoints[setpoint].value
                    ) {
                      const min =
                        newSetpoints[setpoint].min ||
                        oldSetpoints[setpoint].min;

                      const max =
                        newSetpoints[setpoint].max ||
                        oldSetpoints[setpoint].max;

                      if (typeof min !== "number" || typeof max !== "number") {
                        delta[`setpoints.${setpoint}`] = 1;
                      } else {
                        const oldValue = oldSetpoints[setpoint].value;
                        const value = newSetpoints[setpoint].value;
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
          }
        }
      }
    }

    return delta;
  }
}

export default Thermostat;
