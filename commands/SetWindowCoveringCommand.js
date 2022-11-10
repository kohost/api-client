const Command = require("./Command");

class SetWindowCoveringCommand extends Command {
  constructor({ id, position }) {
    super({ id, position });
  }

  get name() {
    return "SetWindowCovering";
  }

  get exchange() {
    return "Devices";
  }

  get routingKey() {
    return `windowcovering.${this.data.id}.set`;
  }
}

module.exports = SetWindowCoveringCommand;
