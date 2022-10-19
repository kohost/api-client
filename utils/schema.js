const Ajv = require("ajv");
const ajv = new Ajv({
  allErrors: true,
  useDefaults: true,
  strict: true,
  allowMatchingProperties: true,
  allowUnionTypes: true,
});
const addFormats = require("ajv-formats");

const commonDefs = require("../schemas/definitions/common.json");
const userDefs = require("../schemas/definitions/user.json");
const deviceDefs = require("../schemas/definitions/device.json");

addFormats(ajv);

ajv.addSchema(commonDefs);
ajv.addSchema(userDefs);
ajv.addSchema(deviceDefs);

module.exports = {
  add: function add(schema) {
    ajv.addSchema(schema);
  },
  compile: function compile(schema) {
    return ajv.compile(schema);
  },
};
