// Create the Driver Model
const { createModel } = require("../utils/compiler");
const driverSchema = require("../schemas/driver.json");

const Driver = createModel({
  schema: driverSchema,
  name: "Driver",
});

const driver = new Driver({
  deviceMap: {
    abcdef12_: {
      id: "1",
      type: "dimmer",
      name: "Dimmer 1",
    },
  },
  type: "pelicanWireless",
  health: {},
});

console.log(driver);

module.exports = Driver;
