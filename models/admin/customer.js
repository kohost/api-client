const schemas = require("../../utils/schema");
const schema = require("../../schemas/admin/customer.json");
const Kohost = require("../kohost");

schemas.add(schema);
const validator = schemas.compile(schema);

class Customer extends Kohost {
  constructor(data) {
    super(data);
  }
}

Object.defineProperty(Customer.prototype, "schema", {
  value: schema,
});

Object.defineProperty(Customer.prototype, "validator", {
  get: function () {
    return validator;
  },
});

Object.defineProperty(Customer, "validProperties", {
  value: Object.keys(schema.properties),
});

module.exports = Customer;
