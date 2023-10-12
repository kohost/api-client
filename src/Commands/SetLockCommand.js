const Command = require("./Command");

class SetLockCommand extends Command {
  constructor({ id, state, ...rest }) {
    super({ id, state, ...rest });
  }

  get name() {
    return "SetLock";
  }

  get routingKey() {
    return `lock.${this.data.id}.set`;
  }
}

module.exports = SetLockCommand;
