import Dimmer from "../Models/Dimmer";
import Event from "./Event";

class SystemDimmerUpdatedEvent extends Event {
  constructor(dimmer: Dimmer) {
    super(dimmer);
  }

  get name() {
    return "SystemDimmerUpdated";
  }

  get routingKey() {
    return `dimmer.${this.keyId}.updated`;
  }
}

export default SystemDimmerUpdatedEvent;
