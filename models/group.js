// Create the Group Model
const schemas = require("../utils/schema");
const schema = require("../schemas/group.json");
const Kohost = require("./kohost");
const cloneDeep = require("lodash.clonedeep");

const Room = require("./room");

schemas.add(schema);
const validator = schemas.compile(schema);

class Group extends Kohost {
  constructor(data) {
    const groupData = mapGroupData(data);
    super(groupData);
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

Object.defineProperty(Group.prototype, "schema", {
  value: schema,
});

Object.defineProperty(Group.prototype, "validator", {
  get: function () {
    return validator;
  },
});

Object.defineProperty(Group, "validProperties", {
  value: Object.keys(schema.properties),
});

function mapGroupData(data) {
  const groupData = cloneDeep(data);
  if (groupData.rooms?.length) {
    groupData.rooms.map((room) => {
      if (typeof room === "string") return room;
      if (room instanceof Room) return room;
      return new Room(room);
    });
  }
  return groupData;
}

module.exports = Group;
