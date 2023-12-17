// Create the Device Router Model
import { add, compile } from "../utils/schema";
import schema, { properties } from "../schemas/deviceRouter.json";

import Entity from "./Entity";

add(schema);
const validator = compile(schema);

type DeviceRouterSchema =
  import("../types/DeviceRouterSchema").DeviceRouterSchema;

class DeviceRouter extends Entity {
  constructor(device: DeviceRouterSchema) {
    super(device);
  }

  schema = schema;
  validator = validator;
  validProperties = Object.keys(properties);
}

export default DeviceRouter;
