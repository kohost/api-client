// Create the Category Model
// Originally used for hotel room category e.g. Double Queen
import { registerSchema, compileSchema } from "../utils/schema";
import { schema, type CategorySchema } from "../schemas/category.json";
import Entity from "./Entity";

registerSchema(schema);

interface Category extends CategorySchema {}

class Category extends Entity {
  constructor(category: CategorySchema) {
    super(category);
  }
}

Category.validator = compileSchema(schema);
Category.schema = schema;
Category.validProperties = Object.keys(schema.properties);

export default Category;
