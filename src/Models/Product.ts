// Create the Product Model
import { registerSchema, compileSchema } from "../utils/schema";
import { schema, type ProductSchema } from "../schemas/product.json";
import Entity from "./Entity";

registerSchema(schema);

interface Product extends ProductSchema {}
class Product extends Entity {
  constructor(product: ProductSchema) {
    super(product);
  }
}

Product.validator = compileSchema(schema);
Product.schema = schema;
Product.validProperties = Object.keys(schema.properties);

export default Product;
