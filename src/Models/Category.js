// Create the Category Model
// Originally used for hotel room category e.g. Double Queen
import schema, { properties } from "../schemas/category.json";
import { add, compile } from "../utils/schema";
import { Entity } from "./Entity";

add(schema);
const validator = compile(schema);

export class Category extends Entity {
  /**
   * @typedef {import("../schemas/CategorySchema").Category} CategoryType
   * Create a Category instance.
   * @constructor
   * @param {CategoryType} category - The category object of type SpaceType.
   */
  constructor(category) {
    super(category);
  }
}

Object.defineProperty(Category.prototype, "schema", {
  value: schema,
});

Object.defineProperty(Category.prototype, "validator", {
  get: function () {
    return validator;
  },
});

Object.defineProperty(Category, "validProperties", {
  value: Object.keys(properties),
});
