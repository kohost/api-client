import { Event } from "./Event";

class SystemEntityDeleted extends Event {
  constructor(data: Record<string, any>, context = {}) {
    super(data, context);
  }

  static get name() {
    return "SystemEntityDeleted";
  }

  get entity() {
    return "entity" as const;
  }
}

export default SystemEntityDeleted;
