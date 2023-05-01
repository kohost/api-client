// create the energyReportDaily Model
const schemas = require("../utils/schema");
const schema = require("../schemas/energyReportDaily.json");
const Kohost = require("./kohost");

schemas.add(schema);
const validator = schemas.compile(schema);

class energyReportDaily extends Kohost {
  constructor(data) {
    super(data);
  }
}

Object.defineProperty(energyReportDaily.prototype, "schema", {
  value: schema,
});

Object.defineProperty(energyReportDaily.prototype, "validator", {
  get: function () {
    return validator;
  },
});

Object.defineProperty(energyReportDaily, "validProperties", {
  value: Object.keys(schema.properties),
});

Object.defineProperty(energyReportDaily, "actionProperties", {
  value: ["state"],
});

module.exports = energyReportDaily;

const dailyShardReport = new energyReportDaily({
  "id" :"RepIdHr1",
  "type" :"energyReportDaily",
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