/* @ts-nocheck */
/* This file is automatically generated. Do not modify it manually. */

import { Entity } from "./entity";
import { validateDimmer as validate } from "../validators";

/**
 * @typedef {Object} DimmerData Any smart dimmer
 * @property {string} id - Identifier of the object.
 * @property {string} [name]
 * @property {("alarm"|"dimmer"|"switch"|"motionSensor"|"windowCovering"|"camera"|"mediaSource"|"thermostat"|"lock"|"courtesy"|"gateway"|"tv"|"dvr"|"appleTv"|"discPlayer"|"mediaPlayer"|"uncontrolledDevice")} type
 * @property {("button 1"|"button 2"|"button 3"|"button 4"|"button 5"|"idle"|"powerHasBeedApplied"|"acMainsDisconnected"|"acMainsReconnected"|"replaceBatterySoon"|"replaceBatteryNow"|"batteryOk"|"hardwareFailure"|"softwareFailure"|"hardwareFailureWithCode"|"softwareFailureWithCode"|"motionDetection"|"airFilterNeedsCleaned"|"airFilterNeedsReplaced"|"smokeDetected"|"outsideSafeTemperatureRange"|"outsideSafeHumidityRange"|"scheduleMaintenance"|"doorAjar"|"communicationFailure"|"communicationOk"|"burglarAlarm"|"fireAlarm")[]} [supportedNotifications]
 * @property {{name?: string, timestamp?: number, description?: string}} [notification]
 * @property {("adlink"|"aws-kinesis"|"bacnet"|"butler"|"crestron"|"dell"|"distech"|"dmp"|"doorbird"|"dormakaba"|"dsc"|"ecobee"|"epson"|"geovision-rs"|"geovision-as-manager"|"honeywell-vista"|"igor"|"inncom"|"isapi"|"kohost-k7"|"kohost"|"lg"|"lg-webos"|"lapi"|"lirc"|"mews"|"mht"|"paxton"|"pelican-wireless"|"power-shades"|"rachio"|"rebrandly"|"relay"|"rtsp"|"salto"|"salto-irn"|"samsung"|"se"|"sendgrid"|"sonifi"|"stay-n-touch"|"storable"|"twilio"|"unifi"|"valcom"|"vivotek"|"vizio"|"wisenet"|"cloudflare-images"|"cloudflare-stream"|"insperia-privacy")} driver - Driver used to communicate with the object.
 * @property {boolean} [offline]
 * @property {number} level
 * @property {string} [systemId] - Identifier of the object, directly related to the system.
 * @property {number} [watts]
 * @property {string} [icon]
 * @property {string} [modelNumber]
 * @property {string} [serialNumber]
 * @property {string} [firmwareVersion]
 */

/**
 * Any smart dimmer
 * @class Dimmer
 * @extends {Entity}
 */
export class Dimmer extends Entity {
  /**
   * @constructor
   * @param {DimmerData} data - The data to initialize the Dimmer with
   */
  constructor(data) {
    super(data);
    this.id = data.id;
    if (data.name !== undefined) this.name = data.name;
    this.type = data.type;
    if (data.supportedNotifications !== undefined)
      this.supportedNotifications = data.supportedNotifications;
    if (data.notification !== undefined) this.notification = data.notification;
    this.driver = data.driver;
    if (data.offline !== undefined) this.offline = data.offline;
    this.level = data.level;
    if (data.systemId !== undefined) this.systemId = data.systemId;
    if (data.watts !== undefined) this.watts = data.watts;
    if (data.icon !== undefined) this.icon = data.icon;
    if (data.modelNumber !== undefined) this.modelNumber = data.modelNumber;
    if (data.serialNumber !== undefined) this.serialNumber = data.serialNumber;
    if (data.firmwareVersion !== undefined)
      this.firmwareVersion = data.firmwareVersion;
  }
}

Object.defineProperty(Dimmer.prototype, "schema", {
  value: {
    $schema: "http://json-schema.org/draft-07/schema",
    $id: "dimmer.json",
    title: "Dimmer",
    description: "Any smart dimmer",
    type: "object",
    properties: {
      id: { $ref: "definitions.json#/definitions/id" },
      name: { type: "string" },
      type: { $ref: "definitions.json#/definitions/type" },
      supportedNotifications: {
        $ref: "definitions.json#/definitions/supportedNotifications",
      },
      notification: { $ref: "definitions.json#/definitions/notification" },
      driver: { $ref: "definitions.json#/definitions/driver" },
      offline: { type: "boolean" },
      level: { type: ["number", "null"], minimum: 0, maximum: 100 },
      systemId: { $ref: "definitions.json#/definitions/systemId" },
      watts: { $ref: "definitions.json#/definitions/watts" },
      icon: { type: "string" },
      modelNumber: { type: "string" },
      serialNumber: { type: "string" },
      firmwareVersion: { type: "string" },
    },
    required: ["id", "type", "level", "driver"],
  },
});

Object.defineProperty(Dimmer.prototype, "validator", {
  get: function () {
    return validate;
  },
});
