import { SpaceSchema } from "../Models/Space";
import { Event } from "./Event";

export class SystemSpaceUpdate extends Event {
  constructor(space: SpaceSchema, context = {}) {
    super(space, context);
  }

  static get name() {
    return "SystemSpaceUpdated";
  }

  get entity() {
    return "space" as const;
  }
}

export default SystemSpaceUpdate;
