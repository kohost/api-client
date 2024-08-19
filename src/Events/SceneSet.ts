import { SceneSchema } from "../Models/Scene";
import { Event } from "./Event";

export class SceneSet extends Event {
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
