// create the Camera Model
import schema, { properties } from "../schemas/camera.json";
import { add, compile } from "../utils/schema";
import Entity from "./Entity";

add(schema);
const validator = compile(schema);

export class Camera extends Entity {
  /**
   * @typedef {import("../schemas/CameraSchema").Camera} CameraType
   * Create a Camera instance.
   * @constructor
   * @param {CameraType} camera - The camera object of type Camera.
   */
  constructor(camera) {
    super(camera);
  }
}

Object.defineProperty(Camera.prototype, "schema", {
  value: schema,
});

Object.defineProperty(Camera.prototype, "validator", {
  get: function () {
    return validator;
  },
});

Object.defineProperty(Camera, "validProperties", {
  value: Object.keys(properties),
});
