export default {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "space.json",
  title: "Space",
  type: "object",
  required: ["id", "name", "type"],
  additionalProperties: false,
  properties: {
    id: {
      $ref: "definitions.json#/definitions/id",
    },
    name: {
      type: "string",
      minLength: 1,
    },
    type: {
      type: "string",
      default: "space",
      enum: ["space"],
    },
    discriminator: {
      type: "string",
      enum: [
        "classRoom",
        "hotelRoom",
        "office",
        "building",
        "commonArea",
        "conferenceRoom",
        "lobby",
        "gym",
        "pool",
        "restaurant",
        "unit",
      ],
    },
    floor: {
      type: "string",
    },
    driver: {
      $ref: "definitions.json#/definitions/driver",
    },
    category: {
      type: "string",
      description: "This is the category id",
    },
    rooms: {
      type: "array",
      items: {
        type: "string",
      },
    },
    occupied: {
      type: "boolean",
    },
    inUse: {
      type: "boolean",
    },
    eco: {
      type: "object",
      additionalProperties: false,
      default: {
        active: false,
        allowed: false,
        previousState: null,
      },
      properties: {
        active: {
          type: "boolean",
          default: false,
        },
        activatedAt: {
          type: ["string", "object"],
          format: "date-time",
        },
        allowed: {
          type: "boolean",
          default: false,
        },
        previousState: {
          type: ["object", "null"],
          properties: {
            thermostats: {
              type: "object",
              patternProperties: {
                ".*": {
                  type: "object",
                  properties: {
                    setpoints: {
                      $ref: "thermostat.json#/properties/setpoints",
                    },
                  },
                },
              },
            },
          },
          additionalProperties: false,
        },
      },
    },
    features: {
      type: "array",
      items: {
        type: "string",
        enum: ["pet"],
      },
    },
    maximumOccupancy: {
      type: "number",
      minimum: 1,
    },
    housekeepingStatus: {
      type: "string",
      enum: ["clean", "dirty", "inspected", "pickup"],
    },
    serviceStatus: {
      type: "string",
      enum: ["inService", "outOfOrder", "outOfService"],
    },
    systemId: {
      $ref: "definitions.json#/definitions/systemId",
    },
  },
};

export const getters = {
  hasDimmer() {
    return this.rooms.some((room) => room.hasDimmer);
  },
  hasSwitch() {
    return this.rooms.some((room) => room.hasSwitch);
  },
  hasWindowCovering() {
    return this.rooms.some((room) => room.hasWindowCovering);
  },
  hasThermostat() {
    return this.rooms.some((room) => room.hasThermostat);
  },
  hasLock() {
    return this.rooms.some((room) => room.hasLock);
  },
  hasCourtesy() {
    return this.rooms.some((room) => room.hasCourtesy);
  },
  hasCamera() {
    return this.rooms.some((room) => room.hasCamera);
  },
  hasAlarm() {
    return this.rooms.some((room) => room.hasAlarm);
  },
  hasMedia() {
    return this.rooms.some((room) => room.hasMedia);
  },
};
