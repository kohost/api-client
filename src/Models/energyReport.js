// create the energyReportDaily Model
const schemas = require("../utils/schema");
const schema = require("../schemas/energyReport.json");
const Kohost = require("./kohost");

schemas.add(schema);
const validator = schemas.compile(schema);

class energyReport extends Kohost {
  constructor(data) {
    super(data);
  }
}

Object.defineProperty(energyReport.prototype, "schema", {
  value: schema,
});

Object.defineProperty(energyReport.prototype, "validator", {
  get: function () {
    return validator;
  },
});

Object.defineProperty(energyReport, "validProperties", {
  value: Object.keys(schema.properties),
});

Object.defineProperty(energyReport, "actionProperties", {
  value: ["state"],
});

module.exports = energyReport;

const dailyShardReport = new energyReport({
  "id" :"RepIdHr1",
  "type" :"energyReport",
  "reportTime": "hourly",
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

console.log(dailyShardReport);