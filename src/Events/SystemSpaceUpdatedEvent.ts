import Event from "./Event";

type Space = import("../types/SpaceSchema").Space;

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
