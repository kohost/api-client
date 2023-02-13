const Event = require("./Event");

class SystemSceneControllerUpdatedEvent extends Event {
  constructor(sceneController) {
    super(sceneController);
  }

  get name() {
    return "SystemSceneControllerUpdated";
  }

  get routingKey() {
    return `sceneController.${this.keyId}.updated`;
  }
}

module.exports = SystemSceneControllerUpdatedEvent;
