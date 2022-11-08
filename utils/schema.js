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

const commonDefs = require("../schemas/definitions/common.json");
const deviceDefs = require("../schemas/definitions/device.json");

addFormats(ajv);

ajv.addSchema(commonDefs);

ajv.addSchema(deviceDefs);

module.exports = {
  add: function add(schema) {
    ajv.addSchema(schema);
  },
  compile: function compile(schema) { 
    return ajv.compile(schema);
  },
};
