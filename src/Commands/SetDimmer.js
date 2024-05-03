const Command = require("./Command");

class SetDimmer extends Command {
  constructor({ id, level, ...rest }) {
    super({ id, level, ...rest });
  }

  get name() {
    return "SetDimmer";
  }
}

module.exports = SetDimmer;
