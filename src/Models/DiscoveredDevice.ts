// Create the Discovered Device Model
import { registerSchema, compileSchema } from "../utils/schema";
import {
  schema,
  type DiscoveredDeviceSchema,
} from "../schemas/discoveredDevice.json";
import Entity from "./Entity";

registerSchema(schema);

interface DiscoveredDevice extends DiscoveredDeviceSchema {}

class DiscoveredDevice extends Entity {
  constructor(device: DiscoveredDeviceSchema) {
    super(device);
  }
}

DiscoveredDevice.validator = compileSchema(schema);
DiscoveredDevice.schema = schema;
DiscoveredDevice.validProperties = Object.keys(schema.properties);

export default DiscoveredDevice;
