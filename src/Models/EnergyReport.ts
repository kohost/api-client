import { FromSchema } from "json-schema-to-ts";
import { definitionsSchema } from "../schemas/definitions";
import { createValidator, registerSchema } from "../utils/validation";
import { energyReportSchema } from "./../schemas/energyReport";
import { Entity } from "./Entity";

registerSchema(energyReportSchema);
const validator = createValidator(energyReportSchema);

export type EnergyReportSchema = FromSchema<
  typeof energyReportSchema,
  { references: [typeof definitionsSchema] }
>;

export class EnergyReport extends Entity<EnergyReportSchema> {
  static schema = energyReportSchema;
  validator = validator;
}
