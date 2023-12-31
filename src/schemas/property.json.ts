import { type Definitions } from "./definitions.json";

const propertyDiscriminator = [
  "hospitality",
  "education",
  "commercial",
] as const;

const lockSystems = ["salto", "dormakaba", "paxton"] as const;

export const schema = {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "property.json",
  title: "Property",
  type: "object",
  description: "A property is a physical asset or building",
  required: ["id", "name", "type", "organization"],
  properties: {
    id: {
      $ref: "definitions.json#/definitions/id",
    },
    name: {
      type: "string",
    },
    type: {
      type: "string",
      default: "property",
    },
    discriminator: {
      type: "string",
      enum: propertyDiscriminator,
    },
    organization: {
      type: ["string", "null"],
      description: "Reference (id) to the organization that owns this property",
    },
    testModeEnabled: {
      type: "boolean",
    },
    testMode: {
      type: "object",
      properties: {
        notificationEmailDomains: {
          type: "array",
          items: {
            type: "string",
          },
          description:
            "Only users with email addreses ending in these domains will receive notifications in test mode, including sms, email, or push.",
        },
      },
    },
    timezone: {
      type: "string",
    },
    smsNumber: {
      type: "string",
    },
    checkInTime: {
      type: "string",
    },
    checkOutTime: {
      type: "string",
    },
    address: {
      $ref: "definitions.json#/definitions/address",
    },
    latitude: {
      type: "number",
    },
    longitude: {
      type: "number",
    },
    appFeatures: {
      type: "object",
      properties: {
        RoomControl: {
          type: "object",
          properties: {
            commonAreas: {
              type: "object",
              properties: {
                spaces: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                },
              },
            },
            alarmConfig: {
              type: "object",
              patternProperties: {
                "^[a-zA-Z0-9]+$": {
                  type: "object",
                  properties: {
                    zoneLockMap: {
                      type: "object",
                      description: "Maps zone numbers to lock ids",
                      additionalProperties: { type: "string" },
                    },
                  },
                },
              },
              examples: [
                {
                  wZz7hucY: {
                    zoneLockMap: {
                      "1": "wc87hucc",
                      "2": "bc86hzxc",
                      "3": "zv5ah5jv",
                    },
                  },
                },
              ],
            },
          },
          additionalProperties: false,
        },
        CheckIn: {
          properties: {
            payment: {},
            identification: {},
            earlyCheckIn: {
              type: "object",
              required: ["dynamic"],
              properties: {
                dynamic: {
                  type: "boolean",
                  default: false,
                },
                minimumPrice: {
                  type: "number",
                  default: 10,
                },
                maximumPrice: {
                  type: "number",
                  default: 50,
                },
                priceRatioPerHour: {
                  type: "number",
                  default: 0.1,
                },
              },
            },
            roomUpgrades: {},
          },
        },
        CheckOut: {
          properties: {
            lateCheckOut: {
              type: "object",
              required: ["dynamic"],
              properties: {
                dynamic: {
                  type: "boolean",
                  default: false,
                },
                minimumPrice: {
                  type: "number",
                  default: 10,
                },
                maximumPrice: {
                  type: "number",
                  default: 50,
                },
                priceRatioPerHour: {
                  type: "number",
                  default: 0.1,
                },
              },
            },
          },
        },
        Concierge: {
          type: "object",
          properties: {
            timeTracking: {
              type: "boolean",
              default: false,
            },
            tipping: {
              type: "boolean",
              default: false,
            },
          },
        },
        DigitalKey: {
          type: "object",
          properties: {
            system: {
              type: "string",
              enum: lockSystems,
            },
            systemOnline: {
              type: "boolean",
              default: false,
            },
            enableApp: {
              type: "boolean",
            },
            branding: {
              type: "object",
              properties: {
                logo: {
                  type: "string",
                  format: "uri",
                },
                gradient: {
                  type: "array",
                  items: {
                    type: "string",
                    pattern: "^(?!#ffffff)(#[0-9a-fA-F]{6})$",
                  },
                  minItems: 2,
                  maxItems: 2,
                },
                highlightedGradient: {
                  type: "array",
                  items: {
                    type: "string",
                    pattern: "^(?!#ffffff)(#[0-9a-fA-F]{6})$",
                  },
                  minItems: 2,
                  maxItems: 3,
                },
              },
            },
          },
        },
        Elevator: {},
        Experiences: {},
        Dining: {},
        Rentals: {},
        Shop: {},
        Spa: {},
        Valet: {},
      },
      additionalProperties: false,
      default: {
        RoomControl: {},
      },
    },
    notifications: {
      type: "object",
      properties: {
        email: {
          type: "object",
          properties: {
            enabled: {
              type: "boolean",
            },
          },
          additionalProperties: false,
        },
        sms: {
          type: "object",
          properties: {
            enabled: {
              type: "boolean",
            },
          },
          additionalProperties: false,
        },
        push: {
          type: "object",
          properties: {
            enabled: {
              type: "boolean",
            },
          },
          additionalProperties: false,
        },
      },
      additionalProperties: false,
      default: {
        email: {
          enabled: false,
        },
        sms: {
          enabled: false,
        },
        push: {
          enabled: false,
        },
      },
    },
    credentials: {
      type: "object",
      additionalProperties: true,
    },
  },
} as const;

type PropertyDiscriminator = (typeof propertyDiscriminator)[number];
type LockSystems = (typeof lockSystems)[number];

export interface PropertySchema {
  id: Definitions["id"];
  name: string;
  type: "property";
  discriminator?: PropertyDiscriminator;
  organization?: string | null;
  testModeEnabled: boolean;
  testMode?: {
    notificationEmailDomains: string[];
  };
  timezone: string;
  smsNumber: string;
  checkInTime: string;
  checkOutTime: string;
  address: Definitions["address"];
  latitude: number;
  longitude: number;
  appFeatures: {
    RoomControl?: {
      commonAreas?: {
        spaces: string[];
      };
      alarmConfig?: {
        [key: string]: {
          zoneLockMap: {
            [key: string]: string;
          };
        };
      };
    };
    CheckIn?: {
      payment?: {};
      identification?: {};
      earlyCheckIn?: {
        dynamic: boolean;
        minimumPrice: number;
        maximumPrice: number;
        priceRatioPerHour: number;
      };
      roomUpgrades?: {};
    };
    CheckOut?: {
      lateCheckOut?: {
        dynamic: boolean;
        minimumPrice: number;
        maximumPrice: number;
        priceRatioPerHour: number;
      };
    };
    Concierge?: {
      timeTracking: boolean;
      tipping: boolean;
    };
    DigitalKey?: {
      system: LockSystems;
      systemOnline: boolean;
      enableApp: boolean;
      branding?: {
        logo: string;
        gradient: [string, string];
        highlightedGradient: [string, string, string?];
      };
    };
    Elevator?: {};
    Experiences?: {};
    Dining?: {};
    Rentals?: {};
    Shop?: {};
    Spa?: {};
    Valet?: {};
  };
  notifications: {
    email: {
      enabled: boolean;
    };
    sms: {
      enabled: boolean;
    };
    push: {
      enabled: boolean;
    };
  };
  credentials: {
    [key: string]: any;
  };
}
