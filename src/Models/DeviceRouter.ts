import { FromSchema } from "json-schema-to-ts";
import { definitionsSchema } from "../schemas/definitions";
import { createValidator, registerSchema } from "../utils/validation";
import { deviceRouterSchema } from "./../schemas/deviceRouter";
import { Entity } from "./Entity";

registerSchema(deviceRouterSchema);
const validator = createValidator(deviceRouterSchema);

export type DeviceRouterSchema = FromSchema<
  typeof deviceRouterSchema,
  { references: [typeof definitionsSchema] }
>;

export class DeviceRouter extends Entity<DeviceRouterSchema> {
  static schema = deviceRouterSchema;
  validator = validator;
}

export default DeviceRouter;
