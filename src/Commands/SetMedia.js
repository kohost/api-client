const Command = require("./Command");

class SetMedia extends Command {
  constructor({ id, command, ...rest }) {
    super({ id, command, ...rest });
  }

  get name() {
    return "SetMedia";
  }
}

module.exports = SetMedia;
