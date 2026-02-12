import defs, { ISODateString } from "./definitions";
import type { FromSchema } from "json-schema-to-ts";
import type { switchSchema } from "./switch";
import type { dimmerSchema } from "./dimmer";
import type { thermostatSchema } from "./thermostat";
import type { lockSchema } from "./lock";
import type { windowCoveringSchema } from "./windowCovering";
import type { courtesySchema } from "./courtesy";
import type { cameraSchema } from "./camera";
import type { mediaSourceSchema } from "./mediaSource";
import type { motionSensorSchema } from "./motionSensor";
import type { alarmSchema } from "./alarm";

export const spaceSchema = {
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
        "hallway",
        "conferenceRoom",
        "lobby",
        "gym",
        "pool",
        "restaurant",
        "unit",
        "cafeteria",
        "multiPurposeRoom",
        "library",
        "idf",
        "restroom",
        "exterior",
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
      description: "IDs of rooms in the space",
    },
    spaces: {
      type: "array",
      items: {
        type: "string",
      },
      description: "IDs of sub-spaces in the space",
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
                      type: "object",
                      additionalProperties: false,
                      properties: {
                        cool: {
                          type: "object",
                          additionalProperties: false,
                          properties: {
                            value: {
                              type: "number",
                              minimum: 0,
                              maximum: 99,
                            },
                          },
                        },
                        heat: {
                          type: "object",
                          additionalProperties: false,
                          properties: {
                            value: {
                              type: "number",
                              minimum: 0,
                              maximum: 99,
                            },
                          },
                        },
                        auto: {
                          type: "object",
                          additionalProperties: false,
                          properties: {
                            value: {
                              type: "number",
                              minimum: 0,
                              maximum: 99,
                            },
                          },
                        },
                      },
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
    devices: {
      type: "array",
      items: {
        anyOf: [
          { $ref: "switch.json" },
          { $ref: "dimmer.json" },
          { $ref: "thermostat.json" },
          { $ref: "lock.json" },
          { $ref: "windowCovering.json" },
          { $ref: "courtesy.json" },
          { $ref: "camera.json" },
          { $ref: "mediaSource.json" },
          { $ref: "motionSensor.json" },
          { $ref: "alarm.json" },
        ],
      },
      default: [],
    },
    systemId: {
      $ref: "definitions.json#/definitions/systemId",
    },
    createdAt: {
      $ref: "definitions.json#/definitions/date",
    },
    updatedAt: {
      $ref: "definitions.json#/definitions/date",
    },
    deletedAt: {
      $ref: "definitions.json#/definitions/date",
    },
  },
} as const;

export type SpaceSchema = FromSchema<
  typeof spaceSchema,
  {
    references: [typeof defs, typeof switchSchema, typeof dimmerSchema, typeof thermostatSchema, typeof lockSchema, typeof windowCoveringSchema, typeof courtesySchema, typeof cameraSchema, typeof mediaSourceSchema, typeof motionSensorSchema, typeof alarmSchema];
    deserialize: [
      {
        pattern: {
          format: "date-time";
        };
        output: Date | ISODateString;
      },
    ];
  }
>;
