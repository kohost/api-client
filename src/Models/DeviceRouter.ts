// Create the Device Router Model
import { registerSchema, compileSchema } from "../utils/schema";
import { schema, type DeviceRouterSchema } from "../schemas/deviceRouter.json";
import Entity from "./Entity";

registerSchema(schema);

interface DeviceRouter extends DeviceRouterSchema {}

class DeviceRouter extends Entity {
  constructor(device: DeviceRouterSchema) {
    super(device);
  }
}

DeviceRouter.validator = compileSchema(schema);
DeviceRouter.schema = schema;
DeviceRouter.validProperties = Object.keys(schema.properties);

export default DeviceRouter;
