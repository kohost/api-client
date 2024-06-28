import { FromSchema } from "json-schema-to-ts";
import { definitionsSchema } from "../schemas/definitions";
import { createValidator, registerSchema } from "../utils/validation";
import { windowCoveringSchema } from "./../schemas/windowCovering";
import { Entity } from "./Entity";

registerSchema(windowCoveringSchema);
const validator = createValidator(windowCoveringSchema);

export type WindowCoveringSchema = FromSchema<
  typeof windowCoveringSchema,
  { references: [typeof definitionsSchema] }
>;

export class WindowCovering extends Entity<WindowCoveringSchema> {
  static schema = windowCoveringSchema;
  validator = validator;

  constructor(data: WindowCoveringSchema) {
    super(data);
  }
}
