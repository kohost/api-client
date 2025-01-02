export default {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "alarm.json",
  title: "Alarm",
  description: "Any smart alarm system",
  type: "object",
  properties: {
    id: {
      $ref: "definitions.json#/definitions/id",
    },
    name: {
      type: "string",
      description: "Name of the alarm",
    },
    offline: {
      type: "boolean",
    },
    type: {
      type: "string",
      enum: ["alarm"],
      default: "alarm",
    },
    systemId: {
      $ref: "definitions.json#/definitions/systemId",
    },
    supportedNotifications: {
      $ref: "definitions.json#/definitions/supportedNotifications",
    },
    notification: {
      $ref: "definitions.json#/definitions/notification",
    },
    driver: {
      $ref: "definitions.json#/definitions/driver",
    },
    areas: {
      type: "array",
      items: {
        type: "object",
        properties: {
          number: {
            type: "number",
          },
          name: {
            type: "string",
          },
          securityMode: {
            type: ["string", "null"],
            enum: ["arming", "disarming", "armed", "disarmed", "alarm", null],
          },
        },
        additionalProperties: false,
      },
    },
    zones: {
      type: "array",
      items: {
        type: "object",
        properties: {
          number: {
            type: "number",
            minimum: 0,
          },
          name: {
            type: "string",
          },
          secure: {
            type: ["boolean", "null"],
          },
          bypassed: {
            type: ["boolean", "null"],
          },
        },
        additionalProperties: false,
      },
    },
    chime: {
      type: "boolean",
      description: "Reflects whether console chime is enabled",
    },
    watts: {
      $ref: "definitions.json#/definitions/watts",
    },
    address: {
      $ref: "definitions.json#/definitions/address",
    },
  },
  required: ["id", "type", "areas", "zones", "driver"],
};

/**
 * @typedef {Object} Alarm Any smart alarm system
 * @property {string} id - Identifier of the object.
 * @property {string} [name]
 * @property {boolean} [offline]
 * @property {"alarm"} type - Default: "alarm"
 * @property {string} [systemId] - Identifier of the object, directly related to the system.
 * @property {("button 1"|"button 2"|"button 3"|"button 4"|"button 5"|"idle"|"powerHasBeedApplied"|"acMainsDisconnected"|"acMainsReconnected"|"replaceBatterySoon"|"replaceBatteryNow"|"batteryOk"|"hardwareFailure"|"softwareFailure"|"hardwareFailureWithCode"|"softwareFailureWithCode"|"motionDetection"|"airFilterNeedsCleaned"|"airFilterNeedsReplaced"|"smokeDetected"|"outsideSafeTemperatureRange"|"outsideSafeHumidityRange"|"scheduleMaintenance"|"doorAjar"|"communicationFailure"|"communicationOk"|"burglarAlarm"|"fireAlarm")[]} [supportedNotifications]
 * @property {object} [notification]
 * @property {("aws-kinesis"|"butler"|"crestron"|"dell"|"dmp"|"doorbird"|"dormakaba"|"dsc"|"ecobee"|"epson"|"geovision-rs"|"geovision-as-manager"|"honeywell-vista"|"igor"|"inncom"|"isapi"|"kohost-k7"|"kohost"|"lg"|"lg-webos"|"lapi"|"lirc"|"mews"|"mht"|"paxton"|"pelican-wireless"|"power-shades"|"rachio"|"rebrandly"|"rtsp"|"salto"|"salto-irn"|"samsung"|"se"|"sendgrid"|"sonifi"|"stay-n-touch"|"storable"|"twilio"|"unifi"|"valcom"|"vizio"|"wisenet"|"cloudflare-images"|"cloudflare-stream"|"insperia-privacy")} driver - Driver used to communicate with the object.
 * @property {{number: number, name: string, securityMode: ("arming"|"disarming"|"armed"|"disarmed"|"alarm")}[]} areas
 * @property {{number: number, name: string, secure: boolean, bypassed: boolean}[]} zones
 * @property {boolean} [chime] - Reflects whether console chime is enabled
 * @property {number} [watts]
 * @property {{id: string, line1: string, line2: string, line3: string, city: string, state: string, postalCode: string, countryCode: string}} [address]
 */
