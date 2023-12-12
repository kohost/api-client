// create the energyReportShard Model
import { add, compile } from "../utils/schema";
import schema, { properties } from "../schemas/energyReportShard.json";
import Entity from "./Entity";

add(schema);
const validator = compile(schema);

type EnergyReportShardType =
  import("../types/EnergyReportShardSchema").EnergyReportShard;

class EnergyReportShard extends Entity {
  constructor(energyReportShard: EnergyReportShardType) {
    super(energyReportShard);
  }

  schema = schema;
  validator = validator;
  validProperties = Object.keys(properties);
}

export default EnergyReportShard;
