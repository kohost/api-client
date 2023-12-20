import Courtesy from "../Models/Courtesy";
import Event from "./Event";
class SystemCourtesyUpdatedEvent extends Event {
  constructor(courtesy: Courtesy) {
    super(courtesy);
  }

  get name() {
    return "SystemCourtesyUpdated";
  }

  get routingKey() {
    return `courtesy.${this.keyId}.updated`;
  }
}

export default SystemCourtesyUpdatedEvent;
