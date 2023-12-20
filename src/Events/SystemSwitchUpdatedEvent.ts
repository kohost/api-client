import Switch from "../Models/Switch";
import Event from "./Event";

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
