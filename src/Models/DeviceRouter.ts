// Create the Device Router Model
import { add, compile } from "../utils/schema";
import schema, { properties } from "../schemas/deviceRouter.json";

import Entity from "./Entity";

add(schema);
const validator = compile(schema);

type DeviceRouterType = import("../types/DeviceRouterSchema").DeviceRouter;

class DeviceRouter extends Entity {
  constructor(device: DeviceRouterType) {
    super(device);
  }

  schema = schema;
  validator = validator;
  validProperties = Object.keys(properties);
}

export default DeviceRouter;
