// create the ACL model
const applicationSchema = require("../schemas/application.json");
const { createModel } = require("../utils/compiler");

const Application = createModel({
  schema: applicationSchema,
  name: "Application",
});

module.exports = Application;
