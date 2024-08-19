import { SwitchSchema } from "../Models/Switch";
import { Event } from "./Event";

export class SystemSwitchUpdate extends Event {
  constructor(_switch: SwitchSchema, context = {}) {
    super(_switch, context);
  }

  static get name() {
    return "SystemSwitchUpdated";
  }

  get entity() {
    return "switch" as const;
  }
}

export default SystemSwitchUpdate;
