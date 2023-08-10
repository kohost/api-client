// create the energyReport Model
const schemas = require("../utils/schema");
const schema = require("../schemas/energyReport.json");
const Kohost = require("./Kohost");

schemas.add(schema);
const validator = schemas.compile(schema);

class EnergyReport extends Kohost {
  /**
   * @typedef {import("../schemas/EnergyReportSchema").EnergyReport} EnergyReportType
   * Create a EnergyReport instance.
   * @constructor
   * @param {EnergyReportType} energyReport - The energyReport object of type EnergyReport.
   */
  constructor(energyReport) {
    super(energyReport);
  }
}

Object.defineProperty(EnergyReport.prototype, "schema", {
  value: schema,
});

Object.defineProperty(EnergyReport.prototype, "validator", {
  get: function () {
    return validator;
  },
});

Object.defineProperty(EnergyReport, "validProperties", {
  value: Object.keys(schema.properties),
});

Object.defineProperty(EnergyReport, "actionProperties", {
  value: ["state"],
});

module.exports = EnergyReport;

// const dailyShardReport = new energyReport({
//   "id" :"RepIdHr1",
//   "type" :"energyReport",
//   "reportType": "hourly",
//   "roomId": "TestRoom",
//   "first": new Date(),
//   "last": new Date(),
//   "consumption":[{
//     "id": "1",
//     "type": "dimmer",
//     "kwh" : .1213150,
//   }],
//   "totals": {
//     "lights": 10,
//     "climate": 10,
//     "media": 10 
//   },
//   "costPerKw": .14
// });

// console.log(dailyShardReport);
