import { FromSchema } from "json-schema-to-ts";
import { definitionsSchema } from "../schemas/definitions";
import { createValidator, registerSchema } from "../utils/validation";
import { categorySchema } from "./../schemas/category";
import { Entity } from "./Entity";

registerSchema(categorySchema);
const validator = createValidator(categorySchema);

export type CategorySchema = FromSchema<
  typeof categorySchema,
  { references: [typeof definitionsSchema] }
>;

export class Category extends Entity<CategorySchema> {
  static schema = categorySchema;
  validator = validator;
}
