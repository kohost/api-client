// Create the Driver Model
const schemas = require("../utils/schema");
const schema = require("../schemas/integration.json");
const Kohost = require("./kohost");

schemas.add(schema);
const validator = schemas.compile(schema);
class Integration extends Kohost {
  constructor(data) {
    super(data);
  }
  getDriverDeviceId(kohostDeviceId, type) {
    const found = this.deviceMap.get(kohostDeviceId);
    if (found) {
      if (type && found.type === type) return found.id;
      else if (!type) return found.id;
    }
    return null;
  }

  getDeviceId(driverDeviceId, type) {
    const found = this.driverDeviceMap.get(driverDeviceId);
    if (found) {
      if (type && found.type === type) return found.id;
      else if (!type) return found.id;
    }
    return null;
  }

  getRoomId(driverDeviceId, type) {
    const found = this.driverDeviceMap.get(driverDeviceId);
    if (found) {
      if (type && found.type === type) return found.roomId;
      else if (!type) return found.roomId;
    }
    return null;
  }

  getDeviceData(driverDeviceId, type) {
    const found = this.driverDeviceMap.get(driverDeviceId);
    if (found) {
      if (type && found.type === type)
        return { id: found.id, roomId: found.roomId };
      else if (!type) return { id: found.id, roomId: found.roomId };
    }
    return null;
  }

  get deviceMap() {
    return new Map(Object.entries(this.data?.deviceMap || {}));
  }

  get driverDeviceMap() {
    const map = new Map();
    for (const [id, value] of Object.entries(this.data?.deviceMap || {})) {
      map.set(value.id, { id, type: value.type, roomId: value.roomId });
    }
    return map;
  }
}

Object.defineProperty(Integration.prototype, "schema", {
  value: schema,
});

Object.defineProperty(Integration.prototype, "validator", {
  get: function () {
    return validator;
  },
});

Object.defineProperty(Integration, "validProperties", {
  value: Object.keys(schema.properties),
});

module.exports = Integration;
