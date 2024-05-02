const Command = require("./Command");

class GetCategories extends Command {
  constructor({ id, ...rest }) {
    super({ id, ...rest });
  }

  get name() {
    return "GetCategories";
  }
}

module.exports = GetCategories;
