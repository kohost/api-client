import { DimmerSchema } from "../Models/Dimmer";
import { Event } from "./Event";

export class SystemDimmerUpdated extends Event {
  constructor(dimmer: DimmerSchema, context = {}) {
    super(dimmer, context);
  }

  static get name() {
    return "SystemDimmerUpdated";
  }

  get entity() {
    return "dimmer" as const;
  }
}

export default SystemDimmerUpdated;
