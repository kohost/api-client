// Create the Driver Model
const { createModel } = require("../utils/compiler");
const driverSchema = require("../schemas/driver.json");

const Driver = createModel({
  schema: driverSchema,
  name: "Driver",
});

module.exports = Driver;
