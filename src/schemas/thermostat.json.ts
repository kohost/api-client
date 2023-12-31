import { type Definitions } from "./definitions.json";

const hvacStates = ["cooling", "heating", "off"] as const;

const fanStates = ["off", "low", "medium", "high", "on"] as const;

const hvacModes = ["cool", "heat", "auto", "off"] as const;

const fanModes = ["auto", "low", "medium", "high", "off", "on"] as const;

const temperatureScales = ["celsius", "fahrenheit"] as const;

const humidityScales = ["absolute", "relative"] as const;

export const schema = {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "thermostat.json",
  title: "Thermostat",
  description: "Any smart thermostat",
  type: "object",
  properties: {
    id: {
      $ref: "definitions.json#/definitions/id",
    },
    name: {
      $ref: "definitions.json#/definitions/name",
    },
    type: {
      $ref: "definitions.json#/definitions/type",
      default: "thermostat",
    },
    driver: {
      $ref: "definitions.json#/definitions/driver",
    },
    offline: {
      type: "boolean",
    },
    supportedNotifications: {
      $ref: "definitions.json#/definitions/supportedNotifications",
    },
    notification: {
      $ref: "definitions.json#/definitions/notification",
    },
    currentTemperature: {
      type: "number",
    },
    currentHumidity: {
      type: "number",
      minimum: 0,
      maximum: 99,
    },
    hvacMode: {
      type: "string",
      $ref: "#/properties/supportedHvacModes/items",
    },
    hvacState: {
      type: ["string", "null"],
      enum: hvacStates,
    },
    fanMode: {
      type: "string",
      $ref: "#/properties/supportedFanModes/items",
    },
    fanState: {
      type: ["string", "null"],
      enum: fanStates,
    },
    temperatureScale: {
      type: "string",
      enum: temperatureScales,
      default: "fahrenheit",
    },
    humidityScale: {
      type: ["string", "null"],
      enum: humidityScales,
    },
    supportedHvacModes: {
      type: "array",
      uniqueItems: true,
      minItems: 2,
      items: {
        enum: hvacModes,
      },
    },
    supportedFanModes: {
      type: "array",
      uniqueItems: true,
      items: {
        enum: fanModes,
      },
    },
    setpoints: {
      type: "object",
      additionalProperties: false,
      properties: {
        cool: {
          $ref: "#/$defs/setpoint",
        },
        heat: {
          $ref: "#/$defs/setpoint",
        },
        auto: {
          $ref: "#/$defs/setpoint",
        },
      },
    },
    minAutoDelta: {
      type: "number",
      default: 3,
    },
    cycleRate: {
      type: "number",
    },
    batteryLevel: {
      $ref: "definitions.json#/definitions/batteryLevel",
    },
    systemId: {
      $ref: "definitions.json#/definitions/systemId",
    },
    watts: {
      $ref: "definitions.json#/definitions/watts",
    },
  },
  $defs: {
    setpoint: {
      type: "object",
      additionalProperties: false,
      properties: {
        value: {
          $ref: "#/$defs/setpointValue",
        },
        min: {
          $ref: "#/$defs/setpointMinMax",
        },
        max: {
          $ref: "#/$defs/setpointMinMax",
        },
      },
    },
    setpointValue: {
      type: "number",
      minimum: 0,
      maximum: 99,
    },
    setpointMinMax: {
      type: ["number", "null"],
      minimum: 0,
      maximum: 99,
    },
  },
  required: [
    "id",
    "type",
    "hvacMode",
    "fanMode",
    "hvacState",
    "fanState",
    "setpoints",
    "temperatureScale",
    "supportedHvacModes",
    "supportedFanModes",
    "driver",
  ],
} as const;

type HvacStates = (typeof hvacStates)[number];
type HvacModes = (typeof hvacModes)[number];
type FanModes = (typeof fanModes)[number];
type FanStates = (typeof fanStates)[number];
type TemperatureScales = (typeof temperatureScales)[number];
type HumidityScales = (typeof humidityScales)[number];

export interface ThermostatSchema {
  id: Definitions["id"];
  name?: Definitions["name"];
  type: "thermostat";
  driver: Definitions["driver"];
  offline?: boolean;
  supportedNotifications?: Definitions["supportedNotifications"];
  notification?: Definitions["notification"];
  currentTemperature?: number;
  currentHumidity?: number;
  hvacMode: HvacModes;
  hvacState?: HvacStates;
  fanMode: FanModes;
  fanState?: FanStates;
  temperatureScale: TemperatureScales;
  humidityScale?: HumidityScales;
  supportedHvacModes: HvacModes[];
  supportedFanModes: FanModes[];
  setpoints: {
    cool: {
      value: number;
      min?: number;
      max?: number;
    };
    heat: {
      value: number;
      min?: number;
      max?: number;
    };
    auto: {
      value: number;
      min?: number;
      max?: number;
    };
  };
  minAutoDelta?: number;
  cycleRate?: number;
  batteryLevel?: Definitions["batteryLevel"];
  systemId?: Definitions["systemId"];
  watts?: Definitions["watts"];
}
