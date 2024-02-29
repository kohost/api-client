const getFormalDeviceType = require("./getFormalDeviceType");
const getDeviceTypes = require("./getDeviceTypes");
const schema = require("./schema");
const errorFactory = require("./errorFactory");
const entityFactory = require("./entityFactory");

module.exports = {
  getFormalDeviceType: getFormalDeviceType,
  getDeviceTypes: getDeviceTypes,
  schema: schema,
  errorFactory: errorFactory,
  entityFactory: entityFactory,
};
