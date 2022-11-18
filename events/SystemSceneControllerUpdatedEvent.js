const Event = require("./Event");

class SystemSceneControllerUpdatedEvent extends Event {
  constructor(sceneController) {
    super(sceneController);
  }

  get name() {
    return "SystemSceneControllerUpdated";
  }

  get routingKey() {
    return `sceneController.${this.data.id}.updated`;
  }
}

module.exports = SystemSceneControllerUpdatedEvent;
