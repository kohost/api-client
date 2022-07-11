// create the ACL model
const roomSchema = require("../schemas/room.json");
const { createModel } = require("../utils/compiler");

const Room = createModel({ schema: roomSchema, name: "Room" });

Object.defineProperty(Room.prototype, "hasLight", {
  get: function () {
    return (
      (this.dimmers && this.dimmers.length > 0) ||
      (this.switches && this.switches.length > 0)
    );
  },
});

Object.defineProperty(Room.prototype, "hasShade", {
  get: function () {
    return this.windowCoverings && this.windowCoverings.length > 0;
  },
});

Object.defineProperty(Room.prototype, "hasThermostat", {
  get: function () {
    return this.thermostats && this.thermostats.length > 0;
  },
});

Object.defineProperty(Room.prototype, "hasCourtesy", {
  get: function () {
    return this.hasCourtesy && this.hasCourtesy.length > 0;
  },
});

Object.defineProperty(Room.prototype, "hasMedia", {
  get: function () {
    return this.sources && this.sources.length > 0;
  },
});

Object.defineProperty(Room.prototype, "hasLock", {
  get: function () {
    return this.locks && this.locks.length > 0;
  },
});

Object.defineProperty(Room.prototype, "hasCamera", {
  get: function () {
    return this.cameras && this.cameras.length > 0;
  },
});

Object.defineProperty(Room.prototype, "hasAlarm", {
  get: function () {
    return this.alarms && this.alarms.length > 0;
  },
});

module.exports = Room;
