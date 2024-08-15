import { FromSchema } from "json-schema-to-ts";
import { definitionsSchema } from "../schemas/definitions";
import { createValidator, registerSchema } from "../utils/validation";
import { propertySchema } from "./../schemas/property";
import { Entity } from "./Entity";

registerSchema(propertySchema);
const validator = createValidator(propertySchema);

export type PropertySchema = FromSchema<
  typeof propertySchema,
  { references: [typeof definitionsSchema] }
>;

export class Property extends Entity<PropertySchema> {
  static schema = propertySchema;
  validator = validator;
}
