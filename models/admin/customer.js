const adminCustomerSchema = require("../../schemas/admin/customer.json");
const { createModel } = require("../../utils/compiler");

const Customer = createModel({
  schema: adminCustomerSchema,
  name: "Customer",
});

module.exports = Customer;
