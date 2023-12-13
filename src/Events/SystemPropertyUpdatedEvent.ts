import Event from "./Event";

type Property = import("../types/PropertySchema").Property;

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
