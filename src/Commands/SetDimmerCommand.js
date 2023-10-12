const Command = require("./Command");

class SetDimmerCommand extends Command {
  constructor({ id, level, ...rest }) {
    super({ id, level, ...rest });
  }

  get name() {
    return "SetDimmer";
  }

  get routingKey() {
    return `dimmer.${this.data.id}.set`;
  }
}

module.exports = SetDimmerCommand;
