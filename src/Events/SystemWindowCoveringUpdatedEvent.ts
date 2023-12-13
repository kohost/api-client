import Event from "./Event";

type WindowCovering = import("../types/WindowCoveringSchema").WindowCovering;

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
