import { CategorySchema } from "../Models/Category";
import { Event } from "./Event";

export class SystemCategoryUpdated extends Event {
  constructor(category: CategorySchema, context = {}) {
    super(category, context);
  }

  static get name() {
    return "SystemCategoryUpdated";
  }

  get entity() {
    return "category" as const;
  }
}

export default SystemCategoryUpdated;
