import Event from "./Event";

type Entity = typeof import("../Models/Entity");

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
