const Thermostat = require("../../../models/thermostat");

test("Thermostat properties exist", () => {
  expect(Thermostat.name).toBe("Thermostat");
  expect(Thermostat.actionProperties).toBeDefined();
  expect(Thermostat.validProperties).toBeDefined();
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

test("returns deltas", () => {
  const data = {
    id: "1",
    type: "thermostat",
    name: "Test Thermostat",
    hvacMode: "cool",
    hvacState: "off",
    fanMode: "auto",
    fanState: "off",
    temperatureScale: "fahrenheit",
    supportedHvacModes: ["cool", "heat"],
    supportedFanModes: ["auto", "low"],
    currentTemperature: 72,
    systemData: {},
    setpoints: {
      cool: {
        min: 60,
        max: 85,
        value: 72,
      },
      heat: {
        value: 68,
        min: 60,
        max: 85,
      },
    },
  };
  const thermostat = new Thermostat(data);

  const delta1 = Thermostat.getActionDelta(thermostat, {
    hvacMode: "heat",
    setpoints: {
      cool: {
        value: 71,
      },
    },
  });

  const delta2 = Thermostat.getActionDelta(thermostat, {
    setpoints: {
      heat: {
        value: 71,
      },
    },
  });

  expect(delta1.hvacMode).toBe(1);
  expect(delta1["setpoints.cool"]).toBeLessThan(0);
  expect(delta1["setpoints.cool"]).toBeGreaterThan(-1);
  expect(delta2["setpoints.heat"]).toBeGreaterThan(0);
  expect(delta2["setpoints.heat"]).toBeLessThan(1);
});
