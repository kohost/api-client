import { CourtesySchema } from "../Models/Courtesy";
import { Event } from "./Event";

class SystemCourtesyUpdated extends Event {
  constructor(courtesy: CourtesySchema, context = {}) {
    super(courtesy, context);
  }

  static get name() {
    return "SystemCourtesyUpdated";
  }

  get entity() {
    return "courtesy" as const;
  }
}

export default SystemCourtesyUpdated;
