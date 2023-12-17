// Create the Category Model
// Originally used for hotel room category e.g. Double Queen
import { add, compile } from "../utils/schema";
import schema, { properties } from "../schemas/category.json";
import Entity from "./Entity";

add(schema);
const validator = compile(schema);

type CategorySchema = import("../types/CategorySchema").CategorySchema;

class Category extends Entity {
  constructor(category: CategorySchema) {
    super(category);
  }

  schema = schema;
  validator = validator;
  validProperties = Object.keys(properties);
}

export default Category;
