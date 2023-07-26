// create the energyReportDaily Model
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

module.exports = EnergyReport;