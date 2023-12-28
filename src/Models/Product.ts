// Create the Product Model
import { add, compile } from "../utils/schema";
import schema, { properties } from "../schemas/product.json";
import Entity from "./Entity";
import { ProductSchema } from "../types/ProductSchema";

add(schema);
const validator = compile(schema);

class Product extends Entity {
  constructor(product: ProductSchema) {
    super(product);
  }

  schema = schema;
  validator = validator;
  validProperties = Object.keys(properties);
}

export default Product;
