import Event from "./Event";

type Dimmer = import("../types/DimmerSchema").Dimmer;

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
