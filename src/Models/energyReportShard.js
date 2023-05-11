// create the energyReportShard Model
const schemas = require("../utils/schema");
const schema = require("../schemas/energyReportShard.json");
const Kohost = require("./kohost");

schemas.add(schema);
const validator = schemas.compile(schema);

class EnergyReportShard extends Kohost {
  constructor(data) {
    super(data);
  }
}

Object.defineProperty(EnergyReportShard.prototype, "schema", {
  value: schema,
});

Object.defineProperty(EnergyReportShard.prototype, "validator", {
  get: function () {
    return validator;
  },
});

Object.defineProperty(EnergyReportShard, "validProperties", {
  value: Object.keys(schema.properties),
});

module.exports = EnergyReportShard;
