// Create the Space Model
// A group of rooms -> rooms could become a space later...
import { add, compile } from "../utils/schema";
import schema, { properties } from "../schemas/space.json";
import Entity from "./Entity";
import Room from "./Room";
import { SpaceSchema } from "../types/SpaceSchema";

add(schema);
const validator = compile(schema);

class Space extends Entity {
  constructor(space: SpaceSchema) {
    const spaceData = mapSpaceData(space);
    super(spaceData);
  }

  schema = schema;
  validator = validator;
  validProperties = Object.keys(properties);

  get floor() {
    const floors = new Set();

    this.room.forEach((room: Room) => {
      if (room.floor) floors.add(room.floor);
    });

    return floors.size == 1 ? [...floors][0] : undefined;
  }

  get hasDimmer() {
    return this.rooms.some((room: Room) => room.hasDimmer);
  }

  get hasSwitch() {
    return this.rooms.some((room: Room) => room.hasSwitch);
  }

  get hasWindowCovering() {
    return this.rooms.some((room: Room) => room.hasWindowCovering);
  }

  get hasThermostat() {
    return this.rooms.some((room: Room) => room.hasThermostat);
  }

  get hasLock() {
    return this.rooms.some((room: Room) => room.hasLock);
  }

  get hasCourtesy() {
    return this.rooms.some((room: Room) => room.hasCourtesy);
  }

  get hasCamera() {
    return this.rooms.some((room: Room) => room.hasCamera);
  }

  get hasAlarm() {
    return this.rooms.some((room: Room) => room.hasAlarm);
  }

  get hasMedia() {
    return this.rooms.some((room: Room) => room.hasMedia);
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

export default Space;
