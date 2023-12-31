// Create the WindowCovering Model
import { registerSchema, compileSchema } from "../utils/schema";
import {
  schema,
  type WindowCoveringSchema,
} from "../schemas/windowCovering.json";
import Entity from "./Entity";

registerSchema(schema);

class WindowCovering extends Entity {
  constructor(windowCovering: WindowCoveringSchema) {
    super(windowCovering);
  }

  static getActionDelta(old: any, _new: any) {
    const delta = {} as any;
    for (const action in _new) {
      if (this.actionProperties?.includes(action)) {
        if (action === "position") {
          const oldPos = old[action];
          const newPos = _new[action];
          delta[action] = newPos - oldPos / 100;
        } else if (old[action] !== _new[action]) {
          delta[action] = 1;
        }
      }
    }
    return delta;
  }
}

WindowCovering.validator = compileSchema(schema);
WindowCovering.schema = schema;
WindowCovering.validProperties = Object.keys(schema.properties);
WindowCovering.actionProperties = ["position"];

export default WindowCovering;
