import { type Definitions } from "./definitions.json";
import { type SwitchSchema } from "./switch.json";
import { type DimmerSchema } from "./dimmer.json";
import { type WindowCoveringSchema } from "./windowCovering.json";
import { type ThermostatSchema } from "./thermostat.json";
import { type MediaSourceSchema } from "./mediaSource.json";

export const schema = {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "scene.json",
  title: "Scene",
  description: "A room represents a physical space of controllable IoT devices",
  type: "object",
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
  additionalProperties: false,
} as const;

export interface SceneSchema {
  id: Definitions["id"];
  name?: string;
  description?: string;
  devices: {
    switches?: {
      id: SwitchSchema["id"];
      state: SwitchSchema["state"];
    }[];
    dimmers?: {
      id: DimmerSchema["id"];
      level: DimmerSchema["level"];
    }[];
    windowCoverings?: {
      id: WindowCoveringSchema["id"];
      position: WindowCoveringSchema["position"];
    }[];
    thermostats?: {
      id: ThermostatSchema["id"];
      hvacMode: ThermostatSchema["hvacMode"];
      setpoints: ThermostatSchema["setpoints"];
      fanMode: ThermostatSchema["fanMode"];
      setpointDelta: number;
    }[];
    mediaSources?: {
      id: MediaSourceSchema["id"];
      volume: number;
      commands: Array<string>;
    }[];
  };
  isDefault?: boolean;
  showOnUi?: boolean;
}
