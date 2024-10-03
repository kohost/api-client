import schema, { properties } from "../schemas/scene.json";
import { add, compile } from "../utils/schema";
import { Entity } from "./Entity";

add(schema);
const validator = compile(schema);

export class Scene extends Entity {
  /**
   * @typedef {import("../schemas/SceneSchema").Scene} SceneType
   * Create a Scene instance.
   * @constructor
   * @param {SceneType} scene - The scene object of type Scene.
   */
  constructor(scene) {
    super(scene);
  }
}

Object.defineProperty(Scene.prototype, "schema", {
  value: schema,
});

Object.defineProperty(Scene.prototype, "validator", {
  get: function () {
    return validator;
  },
});

Object.defineProperty(Scene, "validProperties", {
  value: Object.keys(properties),
});
