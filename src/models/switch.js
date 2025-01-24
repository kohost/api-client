/* @ts-nocheck */
/* This file is automatically generated. Do not modify it manually. */

import { Entity } from "./entity";
import { validateSwitch as validate } from "../validators";

export class Switch extends Entity {
  /**
   * @typedef {Object} SwitchData Any smart switch
   * @property {string} id - Identifier of the object.
   * @property {string} [name]
   * @property {("alarm"|"dimmer"|"switch"|"motionSensor"|"windowCovering"|"camera"|"mediaSource"|"thermostat"|"lock"|"courtesy"|"gateway"|"tv"|"dvr"|"appleTv"|"discPlayer"|"mediaPlayer"|"uncontrolledDevice")} type
   * @property {("light"|"fan"|"irrigation")} [discriminator]
   * @property {("button 1"|"button 2"|"button 3"|"button 4"|"button 5"|"idle"|"powerHasBeedApplied"|"acMainsDisconnected"|"acMainsReconnected"|"replaceBatterySoon"|"replaceBatteryNow"|"batteryOk"|"hardwareFailure"|"softwareFailure"|"hardwareFailureWithCode"|"softwareFailureWithCode"|"motionDetection"|"airFilterNeedsCleaned"|"airFilterNeedsReplaced"|"smokeDetected"|"outsideSafeTemperatureRange"|"outsideSafeHumidityRange"|"scheduleMaintenance"|"doorAjar"|"communicationFailure"|"communicationOk"|"burglarAlarm"|"fireAlarm")[]} [supportedNotifications]
   * @property {{name?: string, timestamp?: number, description?: string}} [notification]
   * @property {("adlink"|"aws-kinesis"|"butler"|"crestron"|"dell"|"dmp"|"doorbird"|"dormakaba"|"dsc"|"ecobee"|"epson"|"geovision-rs"|"geovision-as-manager"|"honeywell-vista"|"igor"|"inncom"|"isapi"|"kohost-k7"|"kohost"|"lg"|"lg-webos"|"lapi"|"lirc"|"mews"|"mht"|"paxton"|"pelican-wireless"|"power-shades"|"rachio"|"rebrandly"|"relay"|"rtsp"|"salto"|"salto-irn"|"samsung"|"se"|"sendgrid"|"sonifi"|"stay-n-touch"|"storable"|"twilio"|"unifi"|"valcom"|"vizio"|"wisenet"|"cloudflare-images"|"cloudflare-stream"|"insperia-privacy")} driver - Driver used to communicate with the object.
   * @property {boolean} [offline]
   * @property {("on"|"off")} state
   * @property {string} [systemId] - Identifier of the object, directly related to the system.
   * @property {number} [watts]
   * @property {string} [icon]
   * @property {string} [modelNumber]
   * @property {string} [serialNumber]
   * @property {string} [firmwareVersion]
   */

  /**
   * @param {SwitchData} data - The data to initialize the Switch with
   * @constructor
   */
  constructor(data) {
    super(data);
    if (data.id !== undefined) this.id = data.id;
    if (data.name !== undefined) this.name = data.name;
    if (data.type !== undefined) this.type = data.type;
    if (data.discriminator !== undefined)
      this.discriminator = data.discriminator;
    if (data.supportedNotifications !== undefined)
      this.supportedNotifications = data.supportedNotifications;
    if (data.notification !== undefined) this.notification = data.notification;
    if (data.driver !== undefined) this.driver = data.driver;
    if (data.offline !== undefined) this.offline = data.offline;
    if (data.state !== undefined) this.state = data.state;
    if (data.systemId !== undefined) this.systemId = data.systemId;
    if (data.watts !== undefined) this.watts = data.watts;
    if (data.icon !== undefined) this.icon = data.icon;
    if (data.modelNumber !== undefined) this.modelNumber = data.modelNumber;
    if (data.serialNumber !== undefined) this.serialNumber = data.serialNumber;
    if (data.firmwareVersion !== undefined)
      this.firmwareVersion = data.firmwareVersion;
  }
}

Object.defineProperty(Switch.prototype, "schema", {
  value: {
    $schema: "http://json-schema.org/draft-07/schema",
    $id: "switch.json",
    title: "Switch",
    description: "Any smart switch",
    type: "object",
    properties: {
      id: { $ref: "definitions.json#/definitions/id" },
      name: { type: "string" },
      type: { $ref: "definitions.json#/definitions/type" },
      discriminator: { type: "string", enum: ["light", "fan", "irrigation"] },
      supportedNotifications: {
        $ref: "definitions.json#/definitions/supportedNotifications",
      },
      notification: { $ref: "definitions.json#/definitions/notification" },
      driver: { $ref: "definitions.json#/definitions/driver" },
      offline: { type: "boolean" },
      state: { type: "string", enum: ["on", "off"] },
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

Object.defineProperty(Switch.prototype, "validator", {
  get: function () {
    return validate;
  },
});
