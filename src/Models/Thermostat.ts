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

  static getActionDelta(old: ThermostatSchema, _new: ThermostatSchema) {
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
