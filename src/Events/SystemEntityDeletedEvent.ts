import Entity from "../Models/Entity";
import Event from "./Event";

class SystemEntityDeletedEvent extends Event {
  constructor(entity: Entity) {
    super(entity);
  }

  get name() {
    return "SystemEntityDeleted";
  }

  get routingKey() {
    return `entity.${this.keyId}.deleted`;
  }
}

export default SystemEntityDeletedEvent;
