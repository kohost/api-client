const Command = require("./Command");

class SetWindowCoveringCommand extends Command {
  constructor({ id, position, ...rest }) {
    super({ id, position, ...rest });
  }

  get name() {
    return "SetWindowCovering";
  }

  get routingKey() {
    return `windowCovering.${this.data.id}.set`;
  }
}

module.exports = SetWindowCoveringCommand;
