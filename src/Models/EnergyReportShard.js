// create the energyReportShard Model
import schema, { properties } from "../schemas/energyReportShard.json";
import { add, compile } from "../utils/schema";
import { Entity } from "./Entity";

add(schema);
const validator = compile(schema);

export class EnergyReportShard extends Entity {
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
  value: Object.keys(properties),
});
