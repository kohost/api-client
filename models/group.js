// Create the Group Model
const { createModel } = require("../utils/compiler");
const groupSchema = require("../schemas/group.json");

const Group = createModel({
  schema: groupSchema,
  name: "Group",
});

module.exports = Group;
