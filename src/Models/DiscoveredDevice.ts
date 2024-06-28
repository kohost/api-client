import { FromSchema } from "json-schema-to-ts";
import { definitionsSchema } from "../schemas/definitions";
import { createValidator, registerSchema } from "../utils/validation";
import { discoveredDeviceSchema } from "./../schemas/discoveredDevice";
import { Entity } from "./Entity";

registerSchema(discoveredDeviceSchema);
const validator = createValidator(discoveredDeviceSchema);

export type DiscoveredDeviceSchema = FromSchema<
  typeof discoveredDeviceSchema,
  { references: [typeof definitionsSchema] }
>;

export class DiscoveredDevice extends Entity<DiscoveredDeviceSchema> {
  static schema = discoveredDeviceSchema;
  validator = validator;

  constructor(data: DiscoveredDeviceSchema) {
    super(data);
  }
}
