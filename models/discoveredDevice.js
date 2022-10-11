// Create the Discovered Device Model
const { createModel } = require("../utils/compiler");
const discoveredDeviceSchema = require("../schemas/discoveredDevice.json");

const DiscoveredDevice = createModel({
  schema: discoveredDeviceSchema,
  name: "Discovered Device",
});

module.exports = DiscoveredDevice;
