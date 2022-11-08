const deviceTypes = require("./deviceTypes");
const formalDeviceTypes = deviceTypes.map(
  (type) => type.charAt(0).toUpperCase() + type.slice(1)
);

module.exports = formalDeviceTypes;
