// create the energyReportShard Model
const schemas = require("../utils/schema");
const schema = require("../schemas/energyReportShard.json");
const Entity = require("./Entity");

schemas.add(schema);
const validator = schemas.compile(schema);

class EnergyReportShard extends Entity {
  /**
   * @typedef {import("../schemas/EnergyReportShardSchema").EnergyReportShard} EnergyReportShardType
   * Create a EnergyReportShard instance.
   * @constructor
   * @param {EnergyReportShardType} energyReportShard - The energyReportShard object of type EnergyReportShard.
   */
  constructor(energyReportShard) {
    super(energyReportShard);
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
