const getFormalDeviceType = require("./getFormalDeviceType");
const getDeviceTypes = require("./getDeviceTypes");
const schema = require("./schema");
const errorFactory = require("./errorFactory");

module.exports = {
  getFormalDeviceType: getFormalDeviceType,
  getDeviceTypes: getDeviceTypes,
  schema: schema,
  errorFactory: errorFactory,
};
