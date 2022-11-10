const Command = require("./Command");

class SetSceneControllerCommand extends Command {
  constructor({ id, scene }) {
    super({ id, scene });
  }

  get name() {
    return "SetSceneController";
  }

  get exchange() {
    return "Devices";
  }

  get routingKey() {
    return `sceneController.${this.data.id}.set`;
  }
}

module.exports = SetSceneControllerCommand;
