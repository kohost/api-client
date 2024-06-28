import { PropertySchema } from "../Models/Property";
import { Event } from "./Event";

class SystemPropertyUpdate extends Event {
  constructor(property: PropertySchema, context = {}) {
    super(property, context);
  }

  static get name() {
    return "SystemPropertyUpdated";
  }

  get entity() {
    return "property" as const;
  }
}

export default SystemPropertyUpdate;
