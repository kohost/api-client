import Space from "../Models/Space";
import Event from "./Event";

class SystemSpaceUpdatedEvent extends Event {
  constructor(space: Space) {
    super(space);
  }

  get name() {
    return "SystemSpaceUpdated";
  }

  get routingKey() {
    return `space.${this.keyId}.updated`;
  }
}

export default SystemSpaceUpdatedEvent;
