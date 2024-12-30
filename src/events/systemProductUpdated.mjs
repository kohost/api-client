import { Event } from "./event.mjs";

export class SystemProductUpdated extends Event {
  constructor(product, context) {
    super(product, context);
  }

  static get name() {
    return "SystemProductUpdated";
  }

  static get entity() {
    return "product";
  }
}
