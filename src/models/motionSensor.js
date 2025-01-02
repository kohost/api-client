 
/* @ts-nocheck */
/* This file is automatically generated. Do not modify it manually. */

import { Entity } from "./entity";
import { validateMotionSensor as validate } from "../validators";

export class MotionSensor extends Entity {
  /**
   * @typedef {Object} MotionSensorData Any smart motion sensor
   * @property {string} id - Identifier of the object.
   * @property {("alarm"|"dimmer"|"switch"|"motionSensor"|"windowCovering"|"camera"|"mediaSource"|"thermostat"|"lock"|"courtesy"|"gateway"|"tv"|"dvr"|"appleTv"|"discPlayer"|"mediaPlayer"|"uncontrolledDevice")} type
   * @property {("aws-kinesis"|"butler"|"crestron"|"dell"|"dmp"|"doorbird"|"dormakaba"|"dsc"|"ecobee"|"epson"|"geovision-rs"|"geovision-as-manager"|"honeywell-vista"|"igor"|"inncom"|"isapi"|"kohost-k7"|"kohost"|"lg"|"lg-webos"|"lapi"|"lirc"|"mews"|"mht"|"paxton"|"pelican-wireless"|"power-shades"|"rachio"|"rebrandly"|"rtsp"|"salto"|"salto-irn"|"samsung"|"se"|"sendgrid"|"sonifi"|"stay-n-touch"|"storable"|"twilio"|"unifi"|"valcom"|"vizio"|"wisenet"|"cloudflare-images"|"cloudflare-stream"|"insperia-privacy")} driver - Driver used to communicate with the object.
   * @property {string} [systemId] - Identifier of the object, directly related to the system.
   * @property {("button 1"|"button 2"|"button 3"|"button 4"|"button 5"|"idle"|"powerHasBeedApplied"|"acMainsDisconnected"|"acMainsReconnected"|"replaceBatterySoon"|"replaceBatteryNow"|"batteryOk"|"hardwareFailure"|"softwareFailure"|"hardwareFailureWithCode"|"softwareFailureWithCode"|"motionDetection"|"airFilterNeedsCleaned"|"airFilterNeedsReplaced"|"smokeDetected"|"outsideSafeTemperatureRange"|"outsideSafeHumidityRange"|"scheduleMaintenance"|"doorAjar"|"communicationFailure"|"communicationOk"|"burglarAlarm"|"fireAlarm")[]} [supportedNotifications]
   * @property {{name?: string, timestamp?: number, description?: string}} [notification]
   * @property {number} [watts]
   */

  /**
   * @param {MotionSensorData} data - The data to initialize the MotionSensor with
   * @constructor
   */
  constructor(data) {
    super(data);
    this.id = data.id;
    this.type = data.type;
    this.driver = data.driver;
    this.systemId = data.systemId;
    this.supportedNotifications = data.supportedNotifications;
    this.notification = data.notification;
    this.watts = data.watts;
  }
}

Object.defineProperty(MotionSensor.prototype, "schema", {
  value: {
    $schema: "http://json-schema.org/draft-07/schema",
    $id: "motionSensor.json",
    title: "Motion Sensor",
    description: "Any smart motion sensor",
    type: "object",
    properties: {
      id: { $ref: "definitions.json#/definitions/id" },
      type: { $ref: "definitions.json#/definitions/type" },
      driver: { $ref: "definitions.json#/definitions/driver" },
      systemId: { $ref: "definitions.json#/definitions/systemId" },
      supportedNotifications: {
        $ref: "definitions.json#/definitions/supportedNotifications",
      },
      notification: { $ref: "definitions.json#/definitions/notification" },
      watts: { $ref: "definitions.json#/definitions/watts" },
    },
    additionalProperties: false,
    required: ["id", "type", "driver"],
  },
});

Object.defineProperty(MotionSensor.prototype, "validator", {
  get: function () {
    return validate;
  },
});
