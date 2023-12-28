// Create the Dimmer Model
import { add, compile } from "../utils/schema";
import schema, { properties } from "../schemas/dimmer.json";
import Entity from "./Entity";
import { DimmerSchema } from "../types/DimmerSchema";

add(schema);
const validator = compile(schema);

class Dimmer extends Entity {
  constructor(dimmer: DimmerSchema) {
    super(dimmer);
  }

  schema = schema;
  validator = validator;
  validProperties = Object.keys(properties);

  static get actionProperties(): string[] {
    return ["level"];
  }

  static getActionDelta(old: any, _new: any) {
    const delta = {} as any;
    for (const action in _new) {
      if (this.actionProperties?.includes(action)) {
        if (action === "level") {
          const oldLevel = old[action];
          const newLevel = _new[action];
          delta[action] = newLevel - oldLevel / 100;
        } else {
          delta[action] = 1;
        }
      }
    }
    return delta;
  }
}

export default Dimmer;
