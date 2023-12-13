import Event from "./Event";

type Courtesy = import("../types/CourtesySchema").Courtesy;

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
