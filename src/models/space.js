// Create the Space Model
// A group of rooms -> rooms could become a space later...
const schemas = require("../utils/schema");
const schema = require("../schemas/space.json");
const Entity = require("./Entity").default;

const Room = require("./Room");

schemas.add(schema);
const validator = schemas.compile(schema);

class Space extends Entity {
  /**
   * @typedef {import("../schemas/SpaceSchema").Space} SpaceType
   * Create a Space instance.
   * @constructor
   * @param {SpaceType} space - The space object of type Space.
   */
  constructor(space) {
    const spaceData = mapSpaceData(space);
    super(spaceData);
  }

  get floor() {
    const floors = new Set();

    this.room.forEach((room) => {
      if (room.floor) floors.add(room.floor);
    });

    return floors.size == 1 ? [...floors][0] : undefined;
  }

  get hasDimmer() {
    return this.rooms.some((room) => room.hasDimmer);
  }

  get hasSwitch() {
    return this.rooms.some((room) => room.hasSwitch);
  }

  get hasWindowCovering() {
    return this.rooms.some((room) => room.hasWindowCovering);
  }

  get hasThermostat() {
    return this.rooms.some((room) => room.hasThermostat);
  }

  get hasLock() {
    return this.rooms.some((room) => room.hasLock);
  }

  get hasCourtesy() {
    return this.rooms.some((room) => room.hasCourtesy);
  }

  get hasCamera() {
    return this.rooms.some((room) => room.hasCamera);
  }

  get hasAlarm() {
    return this.rooms.some((room) => room.hasAlarm);
  }

  get hasMedia() {
    return this.rooms.some((room) => room.hasMedia);
  }
}

Object.defineProperty(Space.prototype, "schema", {
  value: schema,
});

Object.defineProperty(Space.prototype, "validator", {
  get: function () {
    return validator;
  },
});

Object.defineProperty(Space, "validProperties", {
  value: Object.keys(schema.properties),
});

function mapSpaceData(data) {
  const spaceData = structuredClone(data);
  if (spaceData.rooms?.length) {
    spaceData.rooms.map((room) => {
      if (typeof room === "string") return room;
      if (room instanceof Room) return room;
      return new Room(room);
    });
  }
  return spaceData;
}

module.exports = Space;
