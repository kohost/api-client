import { FromSchema } from "json-schema-to-ts";
import { definitionsSchema } from "../schemas/definitions";
import { createValidator, registerSchema } from "../utils/validation";
import { productSchema } from "./../schemas/product";
import { Entity } from "./Entity";

registerSchema(productSchema);
const validator = createValidator(productSchema);

export type ProductSchema = FromSchema<
  typeof productSchema,
  { references: [typeof definitionsSchema] }
>;

export class Product extends Entity<ProductSchema> {
  static schema = productSchema;
  validator = validator;
}
