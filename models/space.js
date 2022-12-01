// Create the Space Model
// A group of rooms -> rooms could become a space later...
const schemas = require("../utils/schema");
const schema = require("../schemas/space.json");
const Kohost = require("./kohost");
const cloneDeep = require("lodash.clonedeep"); 

const Room = require("./room");

schemas.add(schema);
const validator = schemas.compile(schema);

class Space extends Kohost { 
  constructor(data) {
    const spaceData = mapSpaceData(data);
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

  get hasSceneController() {
    return this.rooms.some((room) => room.hasSceneController);
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
  get occupied() {
    return this.rooms.some((room) => room.occupied);
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
  const spaceData = cloneDeep(data);
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
