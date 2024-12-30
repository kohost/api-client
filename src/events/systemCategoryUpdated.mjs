import { Event } from "./event.mjs";

export class SystemCategoryUpdated extends Event {
  constructor(category, context) {
    super(category, context);
  }

  static get name() {
    return "SystemCategoryUpdated";
  }

  static get entity() {
    return "category";
  }
}
