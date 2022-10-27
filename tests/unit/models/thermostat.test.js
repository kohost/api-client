const Thermostat = require("../../../models/thermostat");

const valid = {
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

test("Thermostat properties exist", () => {
  expect(Thermostat.name).toBe("Thermostat");
  expect(Thermostat.actionProperties).toBeDefined();
  expect(Thermostat.actionProperties).toBeInstanceOf(Array);
  expect(Thermostat.actionProperties).toEqual(
    expect.arrayContaining(["hvacMode", "fanMode", "setpoints"])
  );
  expect(Thermostat.validProperties).toBeDefined();
});

test("Thermostat validator exists", () => {
  const thermostat = new Thermostat(valid);
  const validator = thermostat.validator;
  expect(validator).toBeDefined();
  expect(validator).toBeInstanceOf(Function);
});

test("Thermostat schema exists", () => {
  const thermostat = new Thermostat(valid);
  const schema = thermostat.schema;
  expect(schema).toBeDefined();
  expect(schema).toBeInstanceOf(Object);
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

test("throws error if invalid hvacMode provided ", () => {
  const data = { ...valid };
  data.hvacMode = "a";
  expect(() => new Thermostat(data)).toThrow();
});

test("throws error if unsupported hvacMode provided ", () => {
  const data = { ...valid };
  data.supportedHvacModes = ["cool"];
  data.hvacMode = "heat";
  expect(() => new Thermostat(data)).toThrow();
});

test("throws error if invalid hvacState provided ", () => {
  const data = { ...valid };
  data.hvacState = "a";
  expect(() => new Thermostat(data)).toThrow();
});

test("throws error if invalid temperatureScale provided ", () => {
  const data = { ...valid };
  data.temperatureScale = "a";
  expect(() => new Thermostat(data)).toThrow();
});

test("throws error if invalid humidityScale provided ", () => {
  const data = { ...valid };
  data.humidityScale = "a";
  expect(() => new Thermostat(data)).toThrow();
});

test("throws error if invalid fanState provided ", () => {
  const data = { ...valid };
  data.fanState = "a";
  expect(() => new Thermostat(data)).toThrow();
});

test("throws error if currentTemperature is out of range ", () => {
  const data = { ...valid };
  const data2 = { ...valid };
  data.currentTemperature = 131;
  data2.currentTemperature = -1;
  expect(() => new Thermostat(data)).toThrow();
  expect(() => new Thermostat(data2)).toThrow();
});

test("throws error if currentHumidity is out of range ", () => {
  const data = { ...valid };
  const data2 = { ...valid };
  data.currentHumidity = 100;
  data2.currentHumidity = -1;
  expect(() => new Thermostat(data)).toThrow();
  expect(() => new Thermostat(data2)).toThrow();
});

test("returns deltas", () => {
  const thermostat = new Thermostat({ ...valid });

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
