// create the energyReportDaily Model
import { add, compile } from "../utils/schema";
import schema, { properties } from "../schemas/energyReport.json";
import Entity from "./Entity";

add(schema);
const validator = compile(schema);

type EnergyReportType =
  import("../types/EnergyReportSchema").EnergyReportHourly;

class EnergyReport extends Entity {
  constructor(energyReport: EnergyReportType) {
    super(energyReport);
  }

  schema = schema;
  validator = validator;
  validProperties = Object.keys(properties);
}

export default EnergyReport;
