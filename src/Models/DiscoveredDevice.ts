// Create the Discovered Device Model
import { add, compile } from "../utils/schema";
import schema, { properties } from "../schemas/discoveredDevice.json";
import Entity from "./Entity";

add(schema);
const validator = compile(schema);

type DiscoveredDeviceType =
  import("../types/DiscoveredDeviceSchema").DiscoveredDevice;

class DiscoveredDevice extends Entity {
  /**
   * @typedef {import("../schemas/DiscoveredDeviceSchema").DiscoveredDevice} DiscoveredDeviceType
   * Create a DiscoveredDevice instance.
   * @constructor
   * @param {DiscoveredDeviceType} device - The dd object of type DiscoveredDevice.
   */
  constructor(device: DiscoveredDeviceType) {
    super(device);
  }

  schema = schema;
  validator = validator;
  validProperties = Object.keys(properties);
}

export default DiscoveredDevice;
