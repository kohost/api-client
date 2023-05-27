// create the energyReportProperty Model
const schemas = require("../utils/schema");
const schema = require("../schemas/energyReportProperty.json");
const Kohost = require("./kohost");

schemas.add(schema);
const validator = schemas.compile(schema);

class energyReportProperty extends Kohost {
  constructor(data) {
    super(data);
  }
}

Object.defineProperty(energyReportProperty.prototype, "schema", {
  value: schema,
});

Object.defineProperty(energyReportProperty.prototype, "validator", {
  get: function () {
    return validator;
  },
});

Object.defineProperty(energyReportProperty, "validProperties", {
  value: Object.keys(schema.properties),
});

Object.defineProperty(energyReportProperty, "actionProperties", {
  value: ["state"],
});

module.exports = energyReportProperty;

// const testReport = new energyReportProperty({
//   "id" :"RepIdHr1",
//   "type" :"energyReportProperty",
//   "reportType": "hourly",
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

// console.log(testReport);