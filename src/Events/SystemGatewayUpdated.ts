import { GatewaySchema } from "../Models/Gateway";
import { Event } from "./Event";

export class SystemGatewayUpdated extends Event {
  constructor(gateway: GatewaySchema, context = {}) {
    super(gateway, context);
  }

  static get name() {
    return "SystemGatewayUpdated";
  }

  get entity() {
    return "gateway" as const;
  }
}

export default SystemGatewayUpdated;
