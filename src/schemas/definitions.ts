export const TICKET_NOTIFICATION_EVENTS = [
  "ticketCreated",
  "ticketAssignedToMe",
  "addedAsCollaborator",
  "mentionedInTicket",
  "messageOnMyTicket",
  "ticketResolved",
  "ticketCreatedAsObserver",
  "messageAsObserver",
  "ticketResolvedAsObserver",
  "approvalRequested",
  "approvalDecided",
] as const;

export type TicketNotificationEvent =
  (typeof TICKET_NOTIFICATION_EVENTS)[number];

export const NOTIFICATION_CHANNELS = ["email", "sms", "push"] as const;

export type NotificationChannel = (typeof NOTIFICATION_CHANNELS)[number];

/**
 * The platform roles an Audience may be selected by. The legacy `Guest` role a
 * permission entry may still carry is deliberately absent: nothing targets it.
 */
export const PLATFORM_ROLE_NAMES = [
  "SuperAdmin",
  "Administrator",
  "Manager",
  "Agent",
  "User",
] as const;

export type PlatformRoleName = (typeof PLATFORM_ROLE_NAMES)[number];

const deliveryCountsNode = {
  type: "object",
  additionalProperties: false,
  required: ["recipients", "sent", "failed"],
  properties: {
    recipients: { type: "integer", minimum: 0 },
    sent: { type: "integer", minimum: 0 },
    failed: { type: "integer", minimum: 0 },
  },
} as const;

const defs = {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "definitions.json",
  title: "Definitions",
  definitions: {
    id: {
      type: "string",
      description: "Identifier of the object.",
    },
    systemId: {
      type: "string",
      description: "Identifier of the object, directly related to the system.",
    },
    systemData: {
      type: "object",
    },
    metadata: {
      type: "object",
      default: {},
    },
    date: {
      type: ["string", "object"],
      format: "date-time",
    },
    file: {
      type: "object",
      required: ["name", "type", "data"],
      properties: {
        name: {
          type: "string",
          description: "Name of the file.",
        },
        type: {
          type: "string",
          description: "MIME type of the file (e.g. application/pdf).",
        },
        data: {
          type: "string",
          description: "Base64-encoded data of the file.",
        },
      },
    },
    address: {
      type: "object",
      additionalProperties: false,
      properties: {
        id: {
          type: "string",
        },
        line1: {
          type: "string",
        },
        line2: {
          type: "string",
        },
        line3: {
          type: "string",
        },
        city: {
          type: "string",
        },
        state: {
          type: "string",
        },
        postalCode: {
          type: "string",
        },
        countryCode: {
          type: "string",
          minLength: 2,
          maxLength: 2,
        },
      },
    },
    driver: {
      type: "string",
      description: "Driver used to communicate with the object.",
      enum: [
        "adlink",
        "apex-american-audio",
        "avigilon-alta",
        "aws-kinesis",
        "bacnet",
        "benq",
        "butler",
        "comelit",
        "cool-automation",
        "crestron",
        "dell",
        "digital-watchdog",
        "distech",
        "dmp",
        "doorbird",
        "dormakaba",
        "dsc",
        "dsc-itv2",
        "earbridge",
        "ecobee",
        "epson",
        "geovision-rs",
        "geovision-as-manager",
        "honeywell-vista",
        "honeywell-resideo",
        "igor",
        "inncom",
        "isapi",
        "kohost-k7",
        "kohost",
        "lapi",
        "lg",
        "lg-webos",
        "linortek",
        "lirc",
        "mews",
        "mht",
        "mobile-mule",
        "mock",
        "modbus",
        "napco",
        "newline",
        "obix",
        "one-roster",
        "onvif",
        "orchid-fusion",
        "paxton",
        "pdk",
        "pelican-wireless",
        "power-shades",
        "rachio",
        "rebrandly",
        "relay",
        "reolink",
        "rtsp",
        "salto",
        "salto-irn",
        "samsung",
        "se",
        "sendgrid",
        "singlewire",
        "smartboard",
        "sonifi",
        "stay-n-touch",
        "storable",
        "twilio",
        "unifi",
        "valcom",
        "veracross",
        "verkada",
        "vivotek",
        "vizio",
        "wisenet",
        "zkteco",
        "cloudflare-images",
        "cloudflare-stream",
        "insperia-privacy",
      ],
    },
    type: {
      type: "string",
      enum: [
        "alarm",
        "camera",
        "courtesy",
        "dimmer",
        "gateway",
        "lock",
        "mediaSource",
        "motionSensor",
        "switch",
        "thermostat",
        "windowCovering",
      ],
    },
    name: {
      type: "string",
    },
    alerts: {
      type: "array",
      uniqueItems: true,
      items: {
        type: "object",
        additionalProperties: false,
        required: ["type", "status", "message"],
        properties: {
          id: {
            type: "string",
          },
          type: {
            type: "string",
            enum: [
              "Battery",
              "Button",
              "Communication",
              "Config",
              "Cost",
              "Door Ajar",
              "Equipment",
              "Maintenance",
              "Motion",
              "Registration",
              "Temperature",
            ],
          },
          status: {
            type: "string",
            enum: ["Active", "Resolved"],
          },
          message: {
            type: "string",
          },
        },
      },
    },
    supportedNotifications: {
      type: "array",
      uniqueItems: true,
      items: {
        enum: [
          "button 1",
          "button 2",
          "button 3",
          "button 4",
          "button 5",
          "idle",
          "powerHasBeedApplied",
          "acMainsDisconnected",
          "acMainsReconnected",
          "replaceBattery",
          "replaceBatterySoon",
          "replaceBatteryNow",
          "batteryOk",
          "hardwareFailure",
          "softwareFailure",
          "hardwareFailureWithCode",
          "softwareFailureWithCode",
          "motionDetection",
          "airFilterNeedsCleaned",
          "airFilterNeedsReplaced",
          "smokeDetected",
          "outsideSafeTemperatureRange",
          "outsideSafeHumidityRange",
          "scheduleMaintenance",
          "doorAjar",
          "communicationFailure",
          "communicationOk",
          "burglarAlarm",
          "fireAlarm",
          "powerTrouble",
          "monitoringTrouble",
          "bellTrouble",
          "configIssue",
        ],
      },
    },
    notification: {
      type: ["object", "null"],
      properties: {
        name: {
          type: "string",
          $ref: "#/definitions/supportedNotifications/items",
        },
        timestamp: {
          type: "number",
          minimum: 1655907956593,
        },
        description: {
          type: "string",
        },
      },
    },
    batteryLevel: {
      type: "number",
      minimum: 0,
      maximum: 100,
    },
    watts: {
      type: "number",
      minimum: 0,
    },
    revenue: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: {
            $ref: "definitions.json#/definitions/id",
          },
          name: {
            type: "string",
          },
          date: {
            type: "string",
            format: "date-time",
          },
          price: {
            type: "number",
          },
          tax: {
            type: ["number", "null"],
          },
        },
      },
    },
    ticketNotificationEvent: {
      type: "string",
      enum: TICKET_NOTIFICATION_EVENTS,
    },
    notificationChannel: {
      type: "string",
      enum: NOTIFICATION_CHANNELS,
    },
    deliveryCounts: deliveryCountsNode,
    audience: {
      type: "object",
      additionalProperties: false,
      description:
        "Who a people-facing broadcast was directed at, as the sender expressed it, plus the snapshot it resolved to. One shape for Announcements, SOS broadcasts and Automation notifications.",
      properties: {
        to: {
          type: "object",
          additionalProperties: false,
          description:
            'The User selector, one kind at a time. Absent or empty selects nobody; everyone is only ever the explicit `id: ["*"]` wildcard.',
          properties: {
            id: {
              type: "array",
              description:
                "Named User ids, or the single wildcard `*` meaning everyone in scope.",
              items: { type: "string" },
            },
            roles: {
              type: "array",
              items: { type: "string", enum: PLATFORM_ROLE_NAMES },
            },
            departmentIds: {
              type: "array",
              items: { type: "string" },
            },
          },
        },
        emergencyContacts: {
          type: "boolean",
          description:
            "Whether the external SIS emergency-contact roster was included. Human-triggered sends only; an Automation can never set it.",
        },
        users: {
          type: "array",
          description:
            "Snapshot of the User ids the selector resolved to at send time.",
          items: { type: "string" },
        },
        delivery: {
          type: "object",
          additionalProperties: false,
          description:
            "Send-time delivery counts per audience. Absent for an audience that was not sent to.",
          properties: {
            internal: deliveryCountsNode,
            emergencyContacts: {
              type: "object",
              additionalProperties: false,
              required: ["recipients", "sent", "failed"],
              properties: {
                ...deliveryCountsNode.properties,
                byChannel: {
                  type: "object",
                  additionalProperties: false,
                  description:
                    "Per-channel counts, present only for the channels attempted.",
                  properties: {
                    sms: deliveryCountsNode,
                    email: deliveryCountsNode,
                  },
                },
              },
            },
          },
        },
      },
    },
  },
} as const;

export type ISODateString = ReturnType<Date["toISOString"]>;

export { defs as definitionsSchema };
export default defs;
