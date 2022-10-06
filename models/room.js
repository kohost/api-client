// create the Room model
const roomSchema = require("../schemas/room.json");
const { createModel } = require("../utils/compiler");
const Switch = require("./switch");
const Dimmer = require("./dimmer");
const Thermostat = require("./thermostat");
const Lock = require("./lock");
const WindowCovering = require("./windowCovering");
const Courtesy = require("./courtesy");
const SceneController = require("./sceneController");
const Camera = require("./camera");
const Alarm = require("./alarm");
const Scene = require("./scene");

function roomPreValidate(data) {
  data.switches?.map((sw) => new Switch(sw));
  data.dimmers?.map((dimmer) => new Dimmer(dimmer));
  data.thermostats?.map((thermostat) => new Thermostat(thermostat));
  data.locks?.map((lock) => new Lock(lock));
  data.windowCoverings?.map((wc) => new WindowCovering(wc));
  data.courtesy?.map((courtesy) => new Courtesy(courtesy));
  data.sceneControllers?.map((sc) => new SceneController(sc));
  data.cameras?.map((camera) => new Camera(camera));
  data.sources?.map((source) => new MediaSource(source));
  data.alarms?.map((alarm) => new Alarm(alarm));
  data.scenes?.map((scene) => {
    if (scene instanceof Scene) return scene;
    else return new Scene(scene);
  });
}

const Room = createModel({
  preValidate: roomPreValidate,
  schema: roomSchema,
  name: "Room",
});

Object.defineProperty(Room.prototype, "hasDimmer", {
  get: function () {
    return this.dimmers && this.dimmers.length > 0;
  },
});

Object.defineProperty(Room.prototype, "hasSwitch", {
  get: function () {
    return this.switches && this.switches.length > 0;
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
    return this.courtesy && this.courtesy.length > 0;
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
