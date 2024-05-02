const Command = require("./Command");

class DiscoverCategories extends Command {
  constructor({ id, ...rest }) {
    super({ id, ...rest });
  }

  get name() {
    return "DiscoverCategories";
  }
}

module.exports = DiscoverCategories;
