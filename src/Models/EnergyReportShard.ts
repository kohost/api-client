// create the energyReportShard Model
import { add, compile } from "../utils/schema";
import schema, { properties } from "../schemas/energyReportShard.json";
import Entity from "./Entity";
import { EnergyReportShardSchema } from "../types/EnergyReportShardSchema";

add(schema);
const validator = compile(schema);

class EnergyReportShard extends Entity {
  constructor(energyReportShard: EnergyReportShardSchema) {
    super(energyReportShard);
  }

  schema = schema;
  validator = validator;
  validProperties = Object.keys(properties);
}

export default EnergyReportShard;
