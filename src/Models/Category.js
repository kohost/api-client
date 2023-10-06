// Create the Category Model
// Originally used for hotel room category e.g. Double Queen
const schemas = require("../utils/schema");
const schema = require("../schemas/category.json");
const Entity = require("./Entity");

schemas.add(schema);
const validator = schemas.compile(schema);

class Category extends Entity {
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
  value: Object.keys(schema.properties),
});

module.exports = Category;
