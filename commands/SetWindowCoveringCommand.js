const Command = require("./Command");

class SetWindowCoveringCommand extends Command {
  constructor({ id, position }) {
    super({ id, position });
  }

  get name() {
    return "SetWindowCovering";
  }

  get routingKey() {
    return `windowCovering.${this.data.id}.set`;
  }

  get replyTo() {
    return "system.response.devices";
  }
}

module.exports = SetWindowCoveringCommand;
