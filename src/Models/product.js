// Create the Product Model
const schemas = require("../utils/schema");
const schema = require("../schemas/product.json");
const Kohost = require("./Kohost");

schemas.add(schema);
const validator = schemas.compile(schema);

class Product extends Kohost {
  constructor(data) {
    super(data);
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
  value: Object.keys(schema.properties),
});

module.exports = Product;
