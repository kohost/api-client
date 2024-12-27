import Event from "./Event";

class SystemCategoryUpdated extends Event {
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

export default SystemCategoryUpdated;
