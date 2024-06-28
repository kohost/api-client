import { SceneSchema } from "../Models/Scene";
import { Event } from "./Event";

class SceneSet extends Event {
  constructor(scene: SceneSchema, context = {}) {
    super(scene, context);
  }

  static get name() {
    return "SceneSet";
  }

  get entity() {
    return "scene" as const;
  }
}

export default SceneSet;
