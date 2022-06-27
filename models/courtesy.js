// create the Courtesy Model
const { createModel } = require("../utils/compiler");
const courtesySchema = require("../schemas/courtesy.json");

const Courtesy = createModel({ schema: courtesySchema, name: "Courtesy" });

module.exports = Courtesy;
