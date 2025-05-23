export default {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "property.json",
  title: "Property",
  type: "object",
  description: "A property is a physical asset or building",
  required: ["id", "name", "type", "organization", "timezone", "discriminator"],
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
      enum: ["property"],
    },
    discriminator: {
      type: "string",
      enum: ["hospitality", "education", "commercial", "storage"],
    },
    organization: {
      type: ["string", "null"],
      description: "Reference (id) to the organization that owns this property",
    },
    departments: {
      type: "array",
      items: {
        type: "string",
      },
    },
    testModeEnabled: {
      type: "boolean",
    },
    testMode: {
      type: "object",
      properties: {
        notificationEmails: {
          type: "array",
          items: {
            type: "string",
          },
          description:
            "Only users with these email addresses will receive notifications in test mode, including sms, email, or push.",
        },
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
      description: "IANA timezone string",
      pattern: "^([a-zA-Z]+/[a-zA-Z_]+)$",
      examples: ["America/New_York", "America/Los_Angeles"],
    },
    smsNumber: {
      type: "string",
    },
    voiceNumber: {
      type: "string",
    },
    tags: {
      type: "array",
      items: {
        type: "string",
      },
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
            disabledSystems: {
              type: "array",
              items: {
                type: "string",
                enum: ["climate", "lights", "shades", "tv", "doors"],
              },
            },
            excludedDeviceIds: {
              type: "array",
              items: {
                type: "string",
              },
              default: [],
            },
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
                      1: "wc87hucc",
                      2: "bc86hzxc",
                      3: "zv5ah5jv",
                    },
                  },
                },
              ],
            },
            cameraConfig: {
              type: "object",
              doorStationConfig: {
                type: "object",
                patternProperties: {
                  "^[a-zA-Z0-9]+$": {
                    type: "object",
                    properties: {
                      lockIds: {
                        type: "array",
                        items: {
                          type: "string",
                        },
                        default: [],
                        description:
                          "List of lock ids that will be available for control from this door station",
                      },
                    },
                  },
                },
              },
              examples: [
                {
                  wZz7hucY: {
                    lockIds: ["wc87hucb", "wc87hucd"],
                  },
                },
              ],
            },
          },
          additionalProperties: false,
        },
        CheckIn: {
          type: "object",
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
                minimumTime: {
                  type: "string",
                },
              },
            },
            roomUpgrades: {},
            pet: {},
            promos: {},
          },
        },
        CheckOut: {
          type: "object",
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
            feedback: {
              type: "boolean",
              default: true,
            },
            ratings: {
              type: "boolean",
              default: true,
            },
            newTicketCCs: {
              type: "array",
              items: {
                type: "string",
              },
              default: [],
            },
            newMessageChannel: {
              type: ["string", "null"],
              enum: ["sms", "email"],
              default: "sms",
              description:
                "Determines how users should be notified of new messages in the concierge system",
            },
            quickServices: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                  },
                  description: {
                    type: "string",
                  },
                  department: {
                    type: "string",
                  },
                  image: {
                    $ref: "mediaFile.json",
                  },
                },
                required: ["name", "description", "image"],
              },
            },
            issues: {
              type: "object",
              properties: {
                syncWithPropertyId: {
                  type: "string",
                },
              },
            },
          },
        },
        DigitalKey: {
          type: "object",
          properties: {
            system: {
              type: "string",
              enum: ["salto", "dormakaba"],
            },
            systemOnline: {
              type: "boolean",
              default: false,
            },
            systemConfig: {
              type: "object",
              properties: {
                legicUrl: {
                  type: "string",
                  format: "uri",
                },
                legicWalletName: {
                  type: "string",
                },
                legicAppId: {
                  type: "number",
                },
                legicTechUsername: {
                  type: "string",
                },
                legicTechPassword: {
                  type: "string",
                },
              },
              additionalProperties: false,
              default: {},
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
        SOS: {
          type: "object",
          properties: {
            active: {
              type: "boolean",
            },
            activeEmergencies: {
              type: "array",
              items: {
                type: "string",
                enum: [
                  "medical",
                  "fire",
                  "suspiciousPerson",
                  "other",
                  "conflict",
                  "shooter",
                ],
              },
            },
          },
        },
        Elevator: {
          type: "object",
        },
        Experiences: {
          type: "object",
        },
        Dining: {
          type: "object",
          properties: {
            system: {
              type: "string",
              enum: ["gotab"],
            },
            systemConfig: {
              type: "object",
              properties: {
                landingUrl: {
                  type: "string",
                  format: "uri",
                },
                includeUserDetails: {
                  type: "boolean",
                },
              },
              additionalProperties: false,
            },
          },
        },
        Rentals: { type: "object" },
        Shop: { type: "object" },
        Spa: { type: "object" },
        Valet: { type: "object" },
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
};
