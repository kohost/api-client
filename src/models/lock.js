/* @ts-nocheck */
/* This file is automatically generated. Do not modify it manually. */

import { Entity } from "./entity";
import { validateLock as validate } from "../validate";

/**
 * @typedef {Object} LockData Any smart lock
 * @property {string} id - Identifier of the object.
 * @property {string} [name]
 * @property {("alarm"|"dimmer"|"switch"|"motionSensor"|"windowCovering"|"camera"|"mediaSource"|"thermostat"|"lock"|"courtesy"|"gateway"|"tv"|"dvr"|"appleTv"|"discPlayer"|"mediaPlayer"|"uncontrolledDevice")} type
 * @property {boolean} [offline]
 * @property {("button 1"|"button 2"|"button 3"|"button 4"|"button 5"|"idle"|"powerHasBeedApplied"|"acMainsDisconnected"|"acMainsReconnected"|"replaceBatterySoon"|"replaceBatteryNow"|"batteryOk"|"hardwareFailure"|"softwareFailure"|"hardwareFailureWithCode"|"softwareFailureWithCode"|"motionDetection"|"airFilterNeedsCleaned"|"airFilterNeedsReplaced"|"smokeDetected"|"outsideSafeTemperatureRange"|"outsideSafeHumidityRange"|"scheduleMaintenance"|"doorAjar"|"communicationFailure"|"communicationOk"|"burglarAlarm"|"fireAlarm")[]} [supportedNotifications]
 * @property {{name?: string, timestamp?: number, description?: string}} [notification]
 * @property {("adlink"|"aws-kinesis"|"bacnet"|"butler"|"comelit"|"crestron"|"dell"|"distech"|"dmp"|"doorbird"|"dormakaba"|"dsc"|"ecobee"|"epson"|"geovision-rs"|"geovision-as-manager"|"honeywell-vista"|"igor"|"inncom"|"isapi"|"kohost-k7"|"kohost"|"lg"|"lg-webos"|"lapi"|"lirc"|"mews"|"mht"|"paxton"|"pelican-wireless"|"power-shades"|"rachio"|"rebrandly"|"relay"|"rtsp"|"salto"|"salto-irn"|"samsung"|"se"|"sendgrid"|"sonifi"|"stay-n-touch"|"storable"|"twilio"|"unifi"|"valcom"|"vivotek"|"vizio"|"wisenet"|"cloudflare-images"|"cloudflare-stream"|"insperia-privacy")} driver - Driver used to communicate with the object.
 * @property {("locked"|"unlocked")} state
 * @property {("normal"|"autoLock"|"emergencyOpen"|"emergencyClose"|"holdOpen"|"lockdown")} [mode] - emergencyOpen and emergencyClose are deprecated and can be removed once Salto, Paxton and Geovision drivers are updated. Default: null
 * @property {("normal"|"autoLock"|"emergencyOpen"|"emergencyClose"|"holdOpen"|"lockdown")[]} [supportedModes]
 * @property {number} [batteryLevel]
 * @property {string} [systemId] - Identifier of the object, directly related to the system.
 * @property {number} [watts]
 * @property {string} [icon]
 * @property {string} [modelNumber]
 * @property {string} [serialNumber]
 * @property {string} [firmwareVersion]
 */

/**
 * Any smart lock
 * @class Lock
 * @extends {Entity}
 */
export class Lock extends Entity {
  /**
   * @constructor
   * @param {LockData} data - The data to initialize the Lock with
   */
  constructor(data) {
    super(data);
    this.id = data.id;
    if (data.name !== undefined) this.name = data.name;
    this.type = data.type;
    if (data.offline !== undefined) this.offline = data.offline;
    if (data.supportedNotifications !== undefined)
      this.supportedNotifications = data.supportedNotifications;
    if (data.notification !== undefined) this.notification = data.notification;
    this.driver = data.driver;
    this.state = data.state;
    if (data.mode !== undefined) this.mode = data.mode;
    if (data.supportedModes !== undefined)
      this.supportedModes = data.supportedModes;
    if (data.batteryLevel !== undefined) this.batteryLevel = data.batteryLevel;
    if (data.systemId !== undefined) this.systemId = data.systemId;
    if (data.watts !== undefined) this.watts = data.watts;
    if (data.icon !== undefined) this.icon = data.icon;
    if (data.modelNumber !== undefined) this.modelNumber = data.modelNumber;
    if (data.serialNumber !== undefined) this.serialNumber = data.serialNumber;
    if (data.firmwareVersion !== undefined)
      this.firmwareVersion = data.firmwareVersion;
  }
}

Object.defineProperty(Lock.prototype, "schema", {
  value: {
    $schema: "http://json-schema.org/draft-07/schema",
    $id: "lock.json",
    title: "Lock",
    description: "Any smart lock",
    type: "object",
    properties: {
      id: { $ref: "definitions.json#/definitions/id" },
      name: { type: "string" },
      type: { $ref: "definitions.json#/definitions/type" },
      offline: { type: "boolean" },
      supportedNotifications: {
        $ref: "definitions.json#/definitions/supportedNotifications",
      },
      notification: { $ref: "definitions.json#/definitions/notification" },
      driver: { $ref: "definitions.json#/definitions/driver" },
      state: { type: ["string", "null"], enum: ["locked", "unlocked", null] },
      mode: {
        type: ["string", "null"],
        enum: [
          "normal",
          "autoLock",
          "emergencyOpen",
          "emergencyClose",
          "holdOpen",
          "lockdown",
          null,
        ],
        description:
          "emergencyOpen and emergencyClose are deprecated and can be removed once Salto, Paxton and Geovision drivers are updated",
        default: null,
      },
      supportedModes: {
        type: "array",
        uniqueItems: true,
        items: {
          enum: [
            "normal",
            "autoLock",
            "emergencyOpen",
            "emergencyClose",
            "holdOpen",
            "lockdown",
            null,
          ],
        },
      },
      batteryLevel: { $ref: "definitions.json#/definitions/batteryLevel" },
      systemId: { $ref: "definitions.json#/definitions/systemId" },
      watts: { $ref: "definitions.json#/definitions/watts" },
      icon: { type: "string" },
      modelNumber: { type: "string" },
      serialNumber: { type: "string" },
      firmwareVersion: { type: "string" },
    },
    required: ["id", "type", "state", "driver"],
  },
});

Object.defineProperty(Lock.prototype, "validator", {
  get: function () {
    return validate;
  },
});
