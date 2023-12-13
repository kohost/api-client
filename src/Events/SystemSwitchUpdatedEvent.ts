import Event from "./Event";

type Switch = import("../types/SwitchSchema").Switch;

class SystemSwitchUpdatedEvent extends Event {
  constructor(_switch: Switch) {
    super(_switch);
  }

  get name() {
    return "SystemSwitchUpdated";
  }

  get routingKey() {
    return `switch.${this.keyId}.updated`;
  }
}

export default SystemSwitchUpdatedEvent;
