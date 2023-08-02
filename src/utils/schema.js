const Ajv = require("ajv");
const ajv = new Ajv({
  allErrors: true,
  useDefaults: true,
  strict: false,
  allowMatchingProperties: true,
  allowUnionTypes: true,
  strictRequired: false,
});
const addFormats = require("ajv-formats");

const defininitions = require("../schemas/definitions.json");

addFormats(ajv);

ajv.addSchema(defininitions);

module.exports = {
  add: function add(schema) {
    ajv.addSchema(schema);
  },
  compile: function compile(schema) {
    return ajv.compile(schema);
  },
};
