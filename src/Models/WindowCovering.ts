// Create the WindowCovering Model
import { add, compile } from "../utils/schema";
import schema, { properties } from "../schemas/windowCovering.json";
import Entity from "./Entity";
import { WindowCoveringSchema } from "../types/WindowCoveringSchema";

add(schema);
const validator = compile(schema);

class WindowCovering extends Entity {
  constructor(windowCovering: WindowCoveringSchema) {
    super(windowCovering);
  }

  schema = schema;
  validator = validator;
  validProperties = Object.keys(properties);

  get actionProperties() {
    return ["position"];
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

export default WindowCovering;
