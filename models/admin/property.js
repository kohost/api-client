const adminPropertySchema = require("../../schemas/admin/property.json");
const { createModel } = require("../../utils/compiler");

const Property = createModel({
  schema: adminPropertySchema,
  name: "Property",
});

module.exports = Property;
