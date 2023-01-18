const deviceTypes = require("./deviceTypes");
const formalDeviceTypes = require("./formalDeviceTypes");
const { defs: httpDefs } = require("../Client");

const defs = {
  http: httpDefs,
  deviceTypes,
  formalDeviceTypes,
};

module.exports = defs;
