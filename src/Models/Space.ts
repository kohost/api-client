// Create the Space Model
// A group of rooms -> rooms could become a space later...
import { registerSchema, compileSchema } from "../utils/schema";
import { schema, type SpaceSchema } from "../schemas/space.json";
import Entity from "./Entity";
import Room from "./Room";

registerSchema(schema);

interface Space extends SpaceSchema {}

class Space extends Entity {
  constructor(space: SpaceSchema) {
    const spaceData = mapSpaceData(space);
    super(spaceData);
  }
}

function mapSpaceData(data: SpaceSchema) {
  const spaceData = structuredClone(data);
  if (spaceData.rooms?.length) {
    spaceData.rooms.map((room: any) => {
      if (typeof room === "string") return room;
      if (room instanceof Room) return room;
      return new Room(room);
    });
  }
  return spaceData;
}

Space.schema = schema;
Space.validator = compileSchema(schema);
Space.validProperties = Object.keys(schema.properties);

export default Space;
