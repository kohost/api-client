// create the energyReportHourly Model
const schemas = require("../utils/schema");
const schema = require("../schemas/energyReportHourly.json");
const Kohost = require("./kohost");

schemas.add(schema);
const validator = schemas.compile(schema);

class EnergyReportHourly extends Kohost {
  constructor(data) {
    super(data);
  }
}

Object.defineProperty(EnergyReportHourly.prototype, "schema", {
  value: schema,
});

Object.defineProperty(EnergyReportHourly.prototype, "validator", {
  get: function () {
    return validator;
  },
});

Object.defineProperty(EnergyReportHourly, "validProperties", {
  value: Object.keys(schema.properties),
});

Object.defineProperty(EnergyReportHourly, "actionProperties", {
  value: ["state"],
});

module.exports = EnergyReportHourly;

const hourlyShardReport = new EnergyReportHourly({
  "id" :"RepIdHr1",
  "type" :"energyReportHourly",
  "roomId": "TestRoom",
  "first": new Date(),
  "last": new Date(),
  "consumption":[{
    "id": "1",
    "type": "dimmer",
    "kwh" : .1213150,
  }],
  "totals": [{
    "lights": 10,
    "climate": 10,
    "media": 10 
  }],
  "costPerKw": .14
});

console.log(hourlyShardReport);