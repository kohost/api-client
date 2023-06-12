const Command = require("./Command");

class SetMediaCommand extends Command {
  constructor({ id, command, ...rest }) {
    super({ id, command, ...rest });
  }

  get name() {
    return "SetMedia";
  }

  get routingKey() {
    return `mediaSource.${this.data.id}.set`;
  }
}

module.exports = SetMediaCommand;
