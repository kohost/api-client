import Event from "./event";

class SceneSet extends Event {
  constructor(scene, context) {
    super(scene, context);
  }

  static get name() {
    return "SceneSet";
  }

  static get entity() {
    return "scene";
  }
}

export default SceneSet;
