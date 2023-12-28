// create the energyReportDaily Model
import { add, compile } from "../utils/schema";
import schema, { properties } from "../schemas/energyReport.json";
import Entity from "./Entity";
import { EnergyReportHourlySchema } from "../types/EnergyReportHourlySchema";

add(schema);
const validator = compile(schema);

class EnergyReport extends Entity {
  constructor(energyReport: EnergyReportHourlySchema) {
    super(energyReport);
  }

  schema = schema;
  validator = validator;
  validProperties = Object.keys(properties);
}

export default EnergyReport;
