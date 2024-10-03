// Create the Product Model
import schema, { properties } from "../schemas/product.json";
import { add, compile } from "../utils/schema";
import { Entity } from "./Entity";

add(schema);
const validator = compile(schema);

export class Product extends Entity {
  /**
   * @typedef {import("../schemas/ProductSchema").Product} ProductType
   * Create a Product instance.
   * @constructor
   * @param {ProductType} product - The product object of type Product.
   */
  constructor(product) {
    super(product);
  }
}

Object.defineProperty(Product.prototype, "schema", {
  value: schema,
});

Object.defineProperty(Product.prototype, "validator", {
  get: function () {
    return validator;
  },
});

Object.defineProperty(Product, "validProperties", {
  value: Object.keys(properties),
});
