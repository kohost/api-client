import { FromSchema } from "json-schema-to-ts";
import { definitionsSchema } from "../schemas/definitions";
import { createValidator, registerSchema } from "../utils/validation";
import { energyReportShardSchema } from "./../schemas/energyReportShard";
import { Entity } from "./Entity";

registerSchema(energyReportShardSchema);
const validator = createValidator(energyReportShardSchema);

export type EnergyReportShardSchema = FromSchema<
  typeof energyReportShardSchema,
  { references: [typeof definitionsSchema] }
>;

export class EnergyReportShard extends Entity<EnergyReportShardSchema> {
  static schema = energyReportShardSchema;
  validator = validator;
}
