// create the energyReportDaily Model
import { registerSchema, compileSchema } from "../utils/schema";
import { schema, type EnergyReportSchema } from "../schemas/energyReport.json";
import Entity from "./Entity";

registerSchema(schema);

interface EnergyReport extends EnergyReportSchema {}
class EnergyReport extends Entity {
  constructor(energyReport: EnergyReportSchema) {
    super(energyReport);
  }
}

EnergyReport.validator = compileSchema(schema);
EnergyReport.schema = schema;
EnergyReport.validProperties = Object.keys(schema.properties);

export default EnergyReport;
