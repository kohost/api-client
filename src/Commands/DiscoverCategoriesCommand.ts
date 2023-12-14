import Command from "./Command";

interface DiscoverCategoriesCommandOptions {
  id: string | string[];
  types?: string[];
  [key: string]: any;
}

class DiscoverCategoriesCommand extends Command {
  constructor(options: DiscoverCategoriesCommandOptions) {
    super(options);
  }

  get name() {
    return "DiscoverCategories";
  }

  get routingKey() {
    if (typeof this.data.id === "string")
      return `categories.${this.data.id}.get`;
    if (Array.isArray(this.data.id)) return "categories.batch.get";
    return "categories.get";
  }
}

export default DiscoverCategoriesCommand;
