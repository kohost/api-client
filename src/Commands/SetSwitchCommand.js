const Command = require("./Command");

class SetSwitchCommand extends Command {
  constructor({ id, state, ...rest }) {
    super({ id, state, ...rest });
  }

  get name() {
    return "SetSwitch";
  }

  get routingKey() {
    return `switch.${this.data.id}.set`;
  }
}

module.exports = SetSwitchCommand;
