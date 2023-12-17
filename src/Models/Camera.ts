// create the Camera Model
import { add, compile } from "../utils/schema";
import schema, { properties } from "../schemas/camera.json";
import Entity from "./Entity";

add(schema);
const validator = compile(schema);

type CameraSchema = import("../types/CameraSchema").CameraSchema;

class Camera extends Entity {
  constructor(camera: CameraSchema) {
    super(camera);
  }

  schema = schema;
  validator = validator;
  validProperties = Object.keys(properties);
}

export default Camera;
