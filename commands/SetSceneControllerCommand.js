const Command = require("./Command");

class SetSceneControllerCommand extends Command {
  constructor({ id, scene }) {
    super({ id, scene });
  }

  get name() {
    return "SetSceneController";
  }

  get routingKey() {
    return `sceneController.${this.data.id}.set`;
  }

  get replyTo() {
    return "system.response.devices";
  }
}

module.exports = SetSceneControllerCommand;
