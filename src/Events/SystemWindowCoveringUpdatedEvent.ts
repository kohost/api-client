import WindowCovering from "../Models/WindowCovering";
import Event from "./Event";

class SystemWindowCoveringUpdatedEvent extends Event {
  constructor(windowCovering: WindowCovering) {
    super(windowCovering);
  }

  get name() {
    return "SystemWindowCoveringUpdated";
  }

  get routingKey() {
    return `windowCovering.${this.keyId}.updated`;
  }
}

export default SystemWindowCoveringUpdatedEvent;
