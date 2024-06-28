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
  validator = validator;

  constructor(data: ThermostatSchema) {
    super(data);
  }
}
