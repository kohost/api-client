const mongoose = require("mongoose");
const Thermostat = require("../../../models/thermostat");
const User = require("../../../models/user");
const { toMongoose } = require("../../../utils/compiler");

test("Thermostat properties exist", () => {
  expect(Thermostat.name).toBe("Thermostat");
  expect(Thermostat.settableProperties).toBeDefined();
  expect(Thermostat.requiredProperties).toBeDefined();
});

test("throws error if missing all required properties", () => {
  expect(() => new Thermostat()).toThrow();
});

test("throws error if missing any required property", () => {
  const data = {
    id: "1",
    name: "Test Thermostat",
  };
  expect(() => new Thermostat(data)).toThrow();
});

test("is compatible with schema loadClass", () => {
  const schema = new mongoose.Schema(toMongoose(Thermostat.prototype.schema));

  schema.loadClass(Thermostat);

  expect(schema).toBeDefined();
  for (const key of Thermostat.validProperties) {
    if (key === "id") expect(schema.path(key)).toBeUndefined();
    else expect(schema.paths[key]).toBeDefined();
  }
});
