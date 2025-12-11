import { Event } from "./event";

export class ApplicationOutOfUse extends Event {
  constructor(data = {}, context = {}) {
    super(data, context);
  }

  static get name() {
    return "ApplicationOutOfUse";
  }

  static get entity() {
    return "app";
  }

  static get exchange() {
    return "kohost.events.app";
  }
}
