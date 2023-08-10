const schemas = require("../utils/schema");
const schema = require("../schemas/energyReportShard.json");
const Kohost = require("./Kohost");

schemas.add(schema);
const validator = schemas.compile(schema);

class EnergyReportShard extends Kohost {
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

// const shard = new EnergyReportShard({
//   "id": "ShardId1",
//   "type": "energyReportShard",
//   "roomId": "TestRoom",
//   "first": new Date(),
//   "last": new Date(),
//   "data":[{
//     "time" : new Date(),
//     "watts": 100,
//     "id": "1",
//     "type": "dimmer",
//     "value" : .1213150,
//   }],
//   "ndata": 1,
//   "expires": new Date()
// });

// console.log(shard);
