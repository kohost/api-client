import Property from "../Models/Property";
import Event from "./Event";

class SystemPropertyUpdatedEvent extends Event {
  constructor(property: Property) {
    super(property);
  }

  get name() {
    return "SystemPropertyUpdated";
  }

  get routingKey() {
    return `property.${this.keyId}.updated`;
  }
}

export default SystemPropertyUpdatedEvent;
