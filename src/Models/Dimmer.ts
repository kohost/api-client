// Create the Dimmer Model
import { registerSchema, compileSchema } from "../utils/schema";
import { schema, type DimmerSchema } from "../schemas/dimmer.json";
import Entity from "./Entity";

registerSchema(schema);

interface Dimmer extends DimmerSchema {}
/**
 * @class Dimmer
 * @description
 * Dimmer entity class. Represents a dimmer device.
 * @extends Entity
 * @example
 * const dimmer = new Dimmer({ id: "1", level: 50, type: "dimmer", driver: "crestron" });
 */
class Dimmer extends Entity {
  constructor(dimmer: DimmerSchema) {
    super(dimmer);
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

Dimmer.validator = compileSchema(schema);
Dimmer.schema = schema;
Dimmer.validProperties = Object.keys(schema.properties);
Dimmer.actionProperties = ["level"];

export default Dimmer;
