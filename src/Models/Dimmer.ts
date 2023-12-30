// Create the Dimmer Model
import { add, compile } from "../utils/schema";
import { schema } from "../schemas/dimmer";
import Entity from "./Entity";
import { Static } from "@sinclair/typebox";
// import { DimmerSchema } from "../types/DimmerSchema";

add(schema);

type DimmerSchema = Static<typeof schema>;

interface Dimmer extends DimmerSchema {}
/**
 * @class Dimmer
 * @description
 * Dimmer entity class. Represents a dimmer device.
 * @extends Entity
 * @example
 * const dimmer = new Dimmer({ id: "1", level: 50, type: "dimmer" });
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

Dimmer.validator = compile(schema);
Dimmer.schema = schema;
Dimmer.validProperties = Object.keys(properties);
Dimmer.actionProperties = ["level"];

export default Dimmer;
