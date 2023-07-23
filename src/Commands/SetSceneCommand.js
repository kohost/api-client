const Command = require("./Command");

class SetSceneCommand extends Command {
  constructor({ id, devices, ...rest }) {
    super({ id, devices, ...rest });
  }

  get name() {
    return "SetScene";
  }

  get routingKey() {
    return `scene.${this.data.id}.set`;
  }
}

module.exports = SetSceneCommand;
