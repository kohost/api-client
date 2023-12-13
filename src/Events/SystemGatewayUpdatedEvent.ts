import Event from "./Event";

type Gateway = import("../types/GatewaySchema").IoTGateway;

class SystemGatewayUpdatedEvent extends Event {
  constructor(gateway: Gateway) {
    super(gateway);
  }

  get name() {
    return "SystemGatewayUpdated";
  }

  get routingKey() {
    return `gateway.${this.keyId}.updated`;
  }
}

export default SystemGatewayUpdatedEvent;
