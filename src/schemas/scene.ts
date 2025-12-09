import defs from "./definitions";
import type { FromSchema } from "json-schema-to-ts";

export const sceneSchema = {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "scene.json",
  title: "Scene",
  description: "A room represents a physical space of controllable IoT devices",
  type: "object",
  required: ["id", "name", "type"],
  additionalProperties: false,
  properties: {
    id: {
      $ref: "definitions.json#/definitions/id",
    },
    name: {
      type: "string",
    },
    description: {
      type: "string",
    },
    type: {
      type: "string",
      enum: ["scene"],
      default: "scene",
    },
    devices: {
      type: "object",
      properties: {
        switches: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: {
                $ref: "definitions.json#/definitions/id",
              },
              state: {
                $ref: "switch.json#/properties/state",
              },
            },
            default: [],
          },
        },
        dimmers: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: {
                $ref: "definitions.json#/definitions/id",
              },
              level: {
                $ref: "dimmer.json#/properties/level",
              },
            },
          },
          default: [],
        },
        windowCoverings: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: {
                $ref: "definitions.json#/definitions/id",
              },
              position: {
                $ref: "windowCovering.json#/properties/position",
              },
            },
          },
          default: [],
        },
        thermostats: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: {
                $ref: "definitions.json#/definitions/id",
              },
              hvacMode: {
                $ref: "thermostat.json#/properties/hvacMode",
              },
              setpoints: {
                $ref: "thermostat.json#/properties/setpoints",
              },
              fanMode: {
                $ref: "thermostat.json#/properties/fanMode",
              },
              setpointDelta: {
                type: "number",
              },
            },
          },
          default: [],
        },
        mediaSources: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: {
                $ref: "definitions.json#/definitions/id",
              },
              volume: {
                type: "number",
                minimum: 0,
                maximum: 100,
              },
              commands: {
                type: "array",
                items: {
                  type: "string",
                },
              },
            },
          },
        },
        locks: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: {
                $ref: "definitions.json#/definitions/id",
              },
              state: {
                $ref: "lock.json#/properties/state",
              },
              mode: {
                $ref: "lock.json#/properties/mode",
              },
            },
          },
        },
      },
      additionalProperties: false,
    },
    isDefault: {
      type: "boolean",
      default: false,
    },
    showOnUi: {
      type: "boolean",
      default: true,
    },
  },
} as const;

export type SceneSchema = FromSchema<
  typeof sceneSchema,
  { references: [typeof defs] }
>;
