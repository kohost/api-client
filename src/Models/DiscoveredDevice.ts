// Create the Discovered Device Model
import { add, compile } from "../utils/schema";
import schema, { properties } from "../schemas/discoveredDevice.json";
import Entity from "./Entity";

add(schema);
const validator = compile(schema);

type DiscoveredDeviceSchema =
  import("../types/DiscoveredDeviceSchema").DiscoveredDeviceSchema;

class DiscoveredDevice extends Entity {
  constructor(device: DiscoveredDeviceSchema) {
    super(device);
  }

  schema = schema;
  validator = validator;
  validProperties = Object.keys(properties);
}

export default DiscoveredDevice;
