import { Event } from "./event";

export class SystemGatewayUpdated extends Event {
  constructor(gateway, context) {
    super(gateway, context);
  }

  static get name() {
    return "SystemGatewayUpdated";
  }

  static get entity() {
    return "gateway";
  }
}
