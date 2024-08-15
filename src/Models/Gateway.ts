import { FromSchema } from "json-schema-to-ts";
import { definitionsSchema } from "../schemas/definitions";
import { createValidator, registerSchema } from "../utils/validation";
import { gatewaySchema } from "./../schemas/gateway";
import { Entity } from "./Entity";

registerSchema(gatewaySchema);
const validator = createValidator(gatewaySchema);

export type GatewaySchema = FromSchema<
  typeof gatewaySchema,
  { references: [typeof definitionsSchema] }
>;

export class Gateway extends Entity<GatewaySchema> {
  static schema = gatewaySchema;
  validator = validator;
}
