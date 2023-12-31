// create the Camera Model
import { registerSchema, compileSchema } from "../utils/schema";
import { schema, type CameraSchema } from "../schemas/camera.json";
import Entity from "./Entity";

registerSchema(schema);

interface Camera extends CameraSchema {}

class Camera extends Entity {
  constructor(camera: CameraSchema) {
    super(camera);
  }
}

Camera.validator = compileSchema(schema);
Camera.schema = schema;
Camera.validProperties = Object.keys(schema.properties);

export default Camera;
