/* @ts-nocheck */
/* This file is automatically generated. Do not modify it manually. */

import { Entity } from "./entity";
import { validateProperty as validate } from "../validate";

/**
 * @typedef {Object} PropertyData A property is a physical asset or building
 * @property {string} id - Identifier of the object.
 * @property {string} name
 * @property {"property"} type - Default: "property"
 * @property {("hospitality"|"education"|"commercial"|"storage")} discriminator
 * @property {string} organization - Reference (id) to the organization that owns this property
 * @property {string[]} [departments]
 * @property {boolean} [testModeEnabled]
 * @property {{notificationEmails?: string[], notificationEmailDomains?: string[]}} [testMode]
 * @property {string[]} [testMode.notificationEmails] - Only users with these email addresses will receive notifications in test mode, including sms, email, or push.
 * @property {string[]} [testMode.notificationEmailDomains] - Only users with email addreses ending in these domains will receive notifications in test mode, including sms, email, or push.
 * @property {string} timezone - IANA timezone string
 * @property {string} [smsNumber]
 * @property {string} [checkInTime]
 * @property {string} [checkOutTime]
 * @property {{id?: string, line1?: string, line2?: string, line3?: string, city?: string, state?: string, postalCode?: string, countryCode?: string}} [address]
 * @property {number} [latitude]
 * @property {number} [longitude]
 * @property {{RoomControl?: {disabledSystems?: ("climate"|"lights"|"shades"|"tv"|"doors")[], excludedDeviceIds?: string[], commonAreas?: {spaces?: string[]}, alarmConfig?: object}, CheckIn?: {payment?: any, identification?: any, earlyCheckIn?: {dynamic: boolean, minimumPrice?: number, maximumPrice?: number, priceRatioPerHour?: number, minimumTime?: string}, roomUpgrades?: any, pet?: any, promos?: any}, CheckOut?: {lateCheckOut?: {dynamic: boolean, minimumPrice?: number, maximumPrice?: number, priceRatioPerHour?: number}}, Concierge?: {timeTracking?: boolean, tipping?: boolean, feedback?: boolean, ratings?: boolean, newTicketCCs?: string[], newMessageChannel?: ("sms"|"email"), quickServices?: {name: string, description: string, department?: string, image: {id?: any, type: "mediaFile", name?: string, fileHash?: string, category?: string, mimeType?: ("image/*"|"image/jpeg"|"image/png"|"image/gif"|"image/webp"|"image/avif"|"image/svg+xml"|"application/pdf"), data?: string, url?: string, width?: number, height?: number, size?: number, uploadUrl?: string, uploadUrlExpires?: any, createdBy?: string, systemId?: any}}[], issues?: {syncWithPropertyId?: string}}, DigitalKey?: {system?: ("salto"|"dormakaba"), systemOnline?: boolean, systemConfig?: {legicUrl?: string, legicWalletName?: string, legicAppId?: number, legicTechUsername?: string, legicTechPassword?: string}, enableApp?: boolean, branding?: {logo?: string, gradient?: string[], highlightedGradient?: string[]}}, SOS?: {active?: boolean, activeEmergencies?: ("medical"|"fire"|"suspiciousPerson"|"other"|"conflict"|"shooter")[]}, Elevator?: object, Experiences?: object, Dining?: {system?: "gotab", systemConfig?: {landingUrl?: string, includeUserDetails?: boolean}}, Rentals?: object, Shop?: object, Spa?: object, Valet?: object}} [appFeatures] - Default: {"RoomControl":{}}
 * @property {{disabledSystems?: ("climate"|"lights"|"shades"|"tv"|"doors")[], excludedDeviceIds?: string[], commonAreas?: {spaces?: string[]}, alarmConfig?: object}} [appFeatures.RoomControl]
 * @property {("climate"|"lights"|"shades"|"tv"|"doors")[]} [appFeatures.RoomControl.disabledSystems]
 * @property {string[]} [appFeatures.RoomControl.excludedDeviceIds] - Default: []
 * @property {{spaces?: string[]}} [appFeatures.RoomControl.commonAreas]
 * @property {string[]} [appFeatures.RoomControl.commonAreas.spaces]
 * @property {object} [appFeatures.RoomControl.alarmConfig]
 * @property {{payment?: any, identification?: any, earlyCheckIn?: {dynamic: boolean, minimumPrice?: number, maximumPrice?: number, priceRatioPerHour?: number, minimumTime?: string}, roomUpgrades?: any, pet?: any, promos?: any}} [appFeatures.CheckIn]
 * @property {any} [appFeatures.CheckIn.payment]
 * @property {any} [appFeatures.CheckIn.identification]
 * @property {{dynamic: boolean, minimumPrice?: number, maximumPrice?: number, priceRatioPerHour?: number, minimumTime?: string}} [appFeatures.CheckIn.earlyCheckIn]
 * @property {boolean} appFeatures.CheckIn.earlyCheckIn.dynamic - Default: false
 * @property {number} [appFeatures.CheckIn.earlyCheckIn.minimumPrice] - Default: 10
 * @property {number} [appFeatures.CheckIn.earlyCheckIn.maximumPrice] - Default: 50
 * @property {number} [appFeatures.CheckIn.earlyCheckIn.priceRatioPerHour] - Default: 0.1
 * @property {string} [appFeatures.CheckIn.earlyCheckIn.minimumTime]
 * @property {any} [appFeatures.CheckIn.roomUpgrades]
 * @property {any} [appFeatures.CheckIn.pet]
 * @property {any} [appFeatures.CheckIn.promos]
 * @property {{lateCheckOut?: {dynamic: boolean, minimumPrice?: number, maximumPrice?: number, priceRatioPerHour?: number}}} [appFeatures.CheckOut]
 * @property {{dynamic: boolean, minimumPrice?: number, maximumPrice?: number, priceRatioPerHour?: number}} [appFeatures.CheckOut.lateCheckOut]
 * @property {boolean} appFeatures.CheckOut.lateCheckOut.dynamic - Default: false
 * @property {number} [appFeatures.CheckOut.lateCheckOut.minimumPrice] - Default: 10
 * @property {number} [appFeatures.CheckOut.lateCheckOut.maximumPrice] - Default: 50
 * @property {number} [appFeatures.CheckOut.lateCheckOut.priceRatioPerHour] - Default: 0.1
 * @property {{timeTracking?: boolean, tipping?: boolean, feedback?: boolean, ratings?: boolean, newTicketCCs?: string[], newMessageChannel?: ("sms"|"email"), quickServices?: {name: string, description: string, department?: string, image: {id?: any, type: "mediaFile", name?: string, fileHash?: string, category?: string, mimeType?: ("image/*"|"image/jpeg"|"image/png"|"image/gif"|"image/webp"|"image/avif"|"image/svg+xml"|"application/pdf"), data?: string, url?: string, width?: number, height?: number, size?: number, uploadUrl?: string, uploadUrlExpires?: any, createdBy?: string, systemId?: any}}[], issues?: {syncWithPropertyId?: string}}} [appFeatures.Concierge]
 * @property {boolean} [appFeatures.Concierge.timeTracking] - Default: false
 * @property {boolean} [appFeatures.Concierge.tipping] - Default: false
 * @property {boolean} [appFeatures.Concierge.feedback] - Default: true
 * @property {boolean} [appFeatures.Concierge.ratings] - Default: true
 * @property {string[]} [appFeatures.Concierge.newTicketCCs] - Default: []
 * @property {("sms"|"email")} [appFeatures.Concierge.newMessageChannel] - Determines how users should be notified of new messages in the concierge system. Default: "sms"
 * @property {{name: string, description: string, department?: string, image: {id?: any, type: "mediaFile", name?: string, fileHash?: string, category?: string, mimeType?: ("image/*"|"image/jpeg"|"image/png"|"image/gif"|"image/webp"|"image/avif"|"image/svg+xml"|"application/pdf"), data?: string, url?: string, width?: number, height?: number, size?: number, uploadUrl?: string, uploadUrlExpires?: any, createdBy?: string, systemId?: any}}[]} [appFeatures.Concierge.quickServices]
 * @property {{syncWithPropertyId?: string}} [appFeatures.Concierge.issues]
 * @property {string} [appFeatures.Concierge.issues.syncWithPropertyId]
 * @property {{system?: ("salto"|"dormakaba"), systemOnline?: boolean, systemConfig?: {legicUrl?: string, legicWalletName?: string, legicAppId?: number, legicTechUsername?: string, legicTechPassword?: string}, enableApp?: boolean, branding?: {logo?: string, gradient?: string[], highlightedGradient?: string[]}}} [appFeatures.DigitalKey]
 * @property {("salto"|"dormakaba")} [appFeatures.DigitalKey.system]
 * @property {boolean} [appFeatures.DigitalKey.systemOnline] - Default: false
 * @property {{legicUrl?: string, legicWalletName?: string, legicAppId?: number, legicTechUsername?: string, legicTechPassword?: string}} [appFeatures.DigitalKey.systemConfig] - Default: {}
 * @property {string} [appFeatures.DigitalKey.systemConfig.legicUrl]
 * @property {string} [appFeatures.DigitalKey.systemConfig.legicWalletName]
 * @property {number} [appFeatures.DigitalKey.systemConfig.legicAppId]
 * @property {string} [appFeatures.DigitalKey.systemConfig.legicTechUsername]
 * @property {string} [appFeatures.DigitalKey.systemConfig.legicTechPassword]
 * @property {boolean} [appFeatures.DigitalKey.enableApp]
 * @property {{logo?: string, gradient?: string[], highlightedGradient?: string[]}} [appFeatures.DigitalKey.branding]
 * @property {string} [appFeatures.DigitalKey.branding.logo]
 * @property {string[]} [appFeatures.DigitalKey.branding.gradient]
 * @property {string[]} [appFeatures.DigitalKey.branding.highlightedGradient]
 * @property {{active?: boolean, activeEmergencies?: ("medical"|"fire"|"suspiciousPerson"|"other"|"conflict"|"shooter")[]}} [appFeatures.SOS]
 * @property {boolean} [appFeatures.SOS.active]
 * @property {("medical"|"fire"|"suspiciousPerson"|"other"|"conflict"|"shooter")[]} [appFeatures.SOS.activeEmergencies]
 * @property {object} [appFeatures.Elevator]
 * @property {object} [appFeatures.Experiences]
 * @property {{system?: "gotab", systemConfig?: {landingUrl?: string, includeUserDetails?: boolean}}} [appFeatures.Dining]
 * @property {"gotab"} [appFeatures.Dining.system]
 * @property {{landingUrl?: string, includeUserDetails?: boolean}} [appFeatures.Dining.systemConfig]
 * @property {string} [appFeatures.Dining.systemConfig.landingUrl]
 * @property {boolean} [appFeatures.Dining.systemConfig.includeUserDetails]
 * @property {object} [appFeatures.Rentals]
 * @property {object} [appFeatures.Shop]
 * @property {object} [appFeatures.Spa]
 * @property {object} [appFeatures.Valet]
 * @property {{email?: {enabled?: boolean}, sms?: {enabled?: boolean}, push?: {enabled?: boolean}}} [notifications] - Default: {"email":{"enabled":false},"sms":{"enabled":false},"push":{"enabled":false}}
 * @property {{enabled?: boolean}} [notifications.email]
 * @property {boolean} [notifications.email.enabled]
 * @property {{enabled?: boolean}} [notifications.sms]
 * @property {boolean} [notifications.sms.enabled]
 * @property {{enabled?: boolean}} [notifications.push]
 * @property {boolean} [notifications.push.enabled]
 * @property {object} [credentials]
 */

/**
 * A property is a physical asset or building
 * @class Property
 * @extends {Entity}
 */
export class Property extends Entity {
  /**
   * @constructor
   * @param {PropertyData} data - The data to initialize the Property with
   */
  constructor(data) {
    super(data);
    this.id = data.id;
    this.name = data.name;
    this.type = data.type;
    this.discriminator = data.discriminator;
    this.organization = data.organization;
    if (data.departments !== undefined) this.departments = data.departments;
    if (data.testModeEnabled !== undefined)
      this.testModeEnabled = data.testModeEnabled;
    if (data.testMode !== undefined) this.testMode = data.testMode;
    this.timezone = data.timezone;
    if (data.smsNumber !== undefined) this.smsNumber = data.smsNumber;
    if (data.checkInTime !== undefined) this.checkInTime = data.checkInTime;
    if (data.checkOutTime !== undefined) this.checkOutTime = data.checkOutTime;
    if (data.address !== undefined) this.address = data.address;
    if (data.latitude !== undefined) this.latitude = data.latitude;
    if (data.longitude !== undefined) this.longitude = data.longitude;
    if (data.appFeatures !== undefined) this.appFeatures = data.appFeatures;
    if (data.notifications !== undefined)
      this.notifications = data.notifications;
    if (data.credentials !== undefined) this.credentials = data.credentials;
  }
}

Object.defineProperty(Property.prototype, "schema", {
  value: {
    $schema: "http://json-schema.org/draft-07/schema",
    $id: "property.json",
    title: "Property",
    type: "object",
    description: "A property is a physical asset or building",
    required: [
      "id",
      "name",
      "type",
      "organization",
      "timezone",
      "discriminator",
    ],
    properties: {
      id: { $ref: "definitions.json#/definitions/id" },
      name: { type: "string" },
      type: { type: "string", default: "property", enum: ["property"] },
      discriminator: {
        type: "string",
        enum: ["hospitality", "education", "commercial", "storage"],
      },
      organization: {
        type: ["string", "null"],
        description:
          "Reference (id) to the organization that owns this property",
      },
      departments: { type: "array", items: { type: "string" } },
      testModeEnabled: { type: "boolean" },
      testMode: {
        type: "object",
        properties: {
          notificationEmails: {
            type: "array",
            items: { type: "string" },
            description:
              "Only users with these email addresses will receive notifications in test mode, including sms, email, or push.",
          },
          notificationEmailDomains: {
            type: "array",
            items: { type: "string" },
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
      smsNumber: { type: "string" },
      checkInTime: { type: "string" },
      checkOutTime: { type: "string" },
      address: { $ref: "definitions.json#/definitions/address" },
      latitude: { type: "number" },
      longitude: { type: "number" },
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
                items: { type: "string" },
                default: [],
              },
              commonAreas: {
                type: "object",
                properties: {
                  spaces: { type: "array", items: { type: "string" } },
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
                  dynamic: { type: "boolean", default: false },
                  minimumPrice: { type: "number", default: 10 },
                  maximumPrice: { type: "number", default: 50 },
                  priceRatioPerHour: { type: "number", default: 0.1 },
                  minimumTime: { type: "string" },
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
                  dynamic: { type: "boolean", default: false },
                  minimumPrice: { type: "number", default: 10 },
                  maximumPrice: { type: "number", default: 50 },
                  priceRatioPerHour: { type: "number", default: 0.1 },
                },
              },
            },
          },
          Concierge: {
            type: "object",
            properties: {
              timeTracking: { type: "boolean", default: false },
              tipping: { type: "boolean", default: false },
              feedback: { type: "boolean", default: true },
              ratings: { type: "boolean", default: true },
              newTicketCCs: {
                type: "array",
                items: { type: "string" },
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
                    name: { type: "string" },
                    description: { type: "string" },
                    department: { type: "string" },
                    image: { $ref: "mediaFile.json" },
                  },
                  required: ["name", "description", "image"],
                },
              },
              issues: {
                type: "object",
                properties: { syncWithPropertyId: { type: "string" } },
              },
            },
          },
          DigitalKey: {
            type: "object",
            properties: {
              system: { type: "string", enum: ["salto", "dormakaba"] },
              systemOnline: { type: "boolean", default: false },
              systemConfig: {
                type: "object",
                properties: {
                  legicUrl: { type: "string", format: "uri" },
                  legicWalletName: { type: "string" },
                  legicAppId: { type: "number" },
                  legicTechUsername: { type: "string" },
                  legicTechPassword: { type: "string" },
                },
                additionalProperties: false,
                default: {},
              },
              enableApp: { type: "boolean" },
              branding: {
                type: "object",
                properties: {
                  logo: { type: "string", format: "uri" },
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
              active: { type: "boolean" },
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
          Elevator: { type: "object" },
          Experiences: { type: "object" },
          Dining: {
            type: "object",
            properties: {
              system: { type: "string", enum: ["gotab"] },
              systemConfig: {
                type: "object",
                properties: {
                  landingUrl: { type: "string", format: "uri" },
                  includeUserDetails: { type: "boolean" },
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
        default: { RoomControl: {} },
      },
      notifications: {
        type: "object",
        properties: {
          email: {
            type: "object",
            properties: { enabled: { type: "boolean" } },
            additionalProperties: false,
          },
          sms: {
            type: "object",
            properties: { enabled: { type: "boolean" } },
            additionalProperties: false,
          },
          push: {
            type: "object",
            properties: { enabled: { type: "boolean" } },
            additionalProperties: false,
          },
        },
        additionalProperties: false,
        default: {
          email: { enabled: false },
          sms: { enabled: false },
          push: { enabled: false },
        },
      },
      credentials: { type: "object", additionalProperties: true },
    },
  },
});

Object.defineProperty(Property.prototype, "validator", {
  get: function () {
    return validate;
  },
});
