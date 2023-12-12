// Create the Product Model
import { add, compile } from "../utils/schema";
import schema, { properties } from "../schemas/product.json";
import Entity from "./Entity";

add(schema);
const validator = compile(schema);

type ProductType = import("../types/ProductSchema").Product;

class Product extends Entity {
  constructor(product: ProductType) {
    super(product);
  }

  schema = schema;
  validator = validator;
  validProperties = Object.keys(properties);
}

export default Product;
