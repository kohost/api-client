import Event from "./Event";

class SystemEntityDeleted extends Event {
  constructor(data, context) {
    super(data, context);
  }

  static get name() {
    return "SystemEntityDeleted";
  }

  static get entity() {
    return "entity";
  }
}

export default SystemEntityDeleted;
