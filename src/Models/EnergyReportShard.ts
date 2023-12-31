// create the energyReportShard Model
import { registerSchema, compileSchema } from "../utils/schema";
import {
  schema,
  type EnergyReportShardSchema,
} from "../schemas/energyReportShard.json";
import Entity from "./Entity";

registerSchema(schema);

interface EnergyReportShard extends EnergyReportShardSchema {}

class EnergyReportShard extends Entity {
  constructor(energyReportShard: EnergyReportShardSchema) {
    super(energyReportShard);
  }
}

EnergyReportShard.validator = compileSchema(schema);
EnergyReportShard.schema = schema;
EnergyReportShard.validProperties = Object.keys(schema.properties);

export default EnergyReportShard;
