import Event from "./Event";

type Space = import("../types/SpaceSchema").Space;

class SystemCategoryUpdatedEvent extends Event {
  constructor(space: Space) {
    super(space);
  }

  get name() {
    return "SystemCategoryUpdated";
  }

  get routingKey() {
    return `category.${this.keyId}.updated`;
  }
}

export default SystemCategoryUpdatedEvent;
