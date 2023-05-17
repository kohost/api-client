// create the energyReportDaily Model
const schemas = require("../utils/schema");
const schema = require("../schemas/energyReport.json");
const Kohost = require("./kohost");

schemas.add(schema);
const validator = schemas.compile(schema);

class EnergyReport extends Kohost {
  constructor(data) {
    super(data);
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

module.exports = EnergyReport;
