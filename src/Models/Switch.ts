import { FromSchema } from "json-schema-to-ts";
import { definitionsSchema } from "../schemas/definitions";
import { createValidator, registerSchema } from "../utils/validation";
import { switchSchema } from "./../schemas/switch";
import { Entity } from "./Entity";

registerSchema(switchSchema);
const validator = createValidator(switchSchema);

export type SwitchSchema = FromSchema<
  typeof switchSchema,
  { references: [typeof definitionsSchema] }
>;

export class Switch extends Entity<SwitchSchema> {
  static schema = switchSchema;
  validator = validator;

  constructor(data: SwitchSchema) {
    super(data);
  }
}
