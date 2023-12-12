// Create the Category Model
// Originally used for hotel room category e.g. Double Queen
import { add, compile } from "../utils/schema";
import schema, { properties } from "../schemas/category.json";
import Entity from "./Entity";

add(schema);
const validator = compile(schema);

type CategoryType = import("../types/CategorySchema").Category;

class Category extends Entity {
  constructor(category: CategoryType) {
    super(category);
  }

  schema = schema;
  validator = validator;
  validProperties = Object.keys(properties);
}

export default Category;
