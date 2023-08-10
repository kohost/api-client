const Event = require("./Event");

class SceneSetEvent extends Event {
  constructor(scene) {
    super(scene);
  }

  get name() {
    return "SceneSet";
  }

  get routingKey() {
    return `scene.${this.keyId}.updated`;
  }
}

module.exports = SceneSetEvent;
