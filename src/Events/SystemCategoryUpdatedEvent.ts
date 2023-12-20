import Category from "../Models/Category";
import Event from "./Event";

class SystemCategoryUpdatedEvent extends Event {
  constructor(category: Category) {
    super(category);
  }

  get name() {
    return "SystemCategoryUpdated";
  }

  get routingKey() {
    return `category.${this.keyId}.updated`;
  }
}

export default SystemCategoryUpdatedEvent;
