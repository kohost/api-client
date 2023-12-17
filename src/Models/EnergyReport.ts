// create the energyReportDaily Model
import { add, compile } from "../utils/schema";
import schema, { properties } from "../schemas/energyReport.json";
import Entity from "./Entity";

add(schema);
const validator = compile(schema);

type EnergyReportHourlySchema =
  import("../types/EnergyReportHourlySchema").EnergyReportHourlySchema;

class EnergyReport extends Entity {
  constructor(energyReport: EnergyReportHourlySchema) {
    super(energyReport);
  }

  schema = schema;
  validator = validator;
  validProperties = Object.keys(properties);
}

export default EnergyReport;
