import { FromSchema } from "json-schema-to-ts";
import { definitionsSchema } from "../schemas/definitions";
import { createValidator, registerSchema } from "../utils/validation";
import { alarmSchema } from "./../schemas/alarm";
import { Entity } from "./Entity";

registerSchema(alarmSchema);
const validator = createValidator(alarmSchema);

export type AlarmSchema = FromSchema<
  typeof alarmSchema,
  { references: [typeof definitionsSchema] }
>;

export class Alarm extends Entity<AlarmSchema> {
  static schema = alarmSchema;
  validator = validator;

  constructor(data: AlarmSchema) {
    super(data);
  }
}
