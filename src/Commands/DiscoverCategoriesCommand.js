const Command = require("./Command");

class DiscoverCategoriesCommand extends Command {
  constructor({ id, ...rest }) {
    super({ id, ...rest });
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

module.exports = DiscoverCategoriesCommand;
