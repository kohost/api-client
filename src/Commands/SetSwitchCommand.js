const Command = require("./Command");

class SetSwitchCommand extends Command {
  constructor({ id, state }) {
    super({ id, state });
  }

  get name() {
    return "SetSwitch";
  }

  get routingKey() {
    return `switch.${this.data.id}.set`;
  }
}

module.exports = SetSwitchCommand;
