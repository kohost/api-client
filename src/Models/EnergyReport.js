// create the energyReportDaily Model
import schema, { properties } from "../schemas/energyReport.json";
import { add, compile } from "../utils/schema";
import { Entity } from "./Entity";

add(schema);
const validator = compile(schema);

export class EnergyReport extends Entity {
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
  value: Object.keys(properties),
});
