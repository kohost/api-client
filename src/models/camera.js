/* @ts-nocheck */
/* This file is automatically generated. Do not modify it manually. */

import { Entity } from "./entity";
import { validateCamera as validate } from "../validators";

export class Camera extends Entity {
  /**
   * @typedef {Object} CameraData Any smart camera
   * @property {string} id - Identifier of the object.
   * @property {string} [name]
   * @property {("alarm"|"dimmer"|"switch"|"motionSensor"|"windowCovering"|"camera"|"mediaSource"|"thermostat"|"lock"|"courtesy"|"gateway"|"tv"|"dvr"|"appleTv"|"discPlayer"|"mediaPlayer"|"uncontrolledDevice")} type - Default: "camera"
   * @property {boolean} [offline]
   * @property {("button 1"|"button 2"|"button 3"|"button 4"|"button 5"|"idle"|"powerHasBeedApplied"|"acMainsDisconnected"|"acMainsReconnected"|"replaceBatterySoon"|"replaceBatteryNow"|"batteryOk"|"hardwareFailure"|"softwareFailure"|"hardwareFailureWithCode"|"softwareFailureWithCode"|"motionDetection"|"airFilterNeedsCleaned"|"airFilterNeedsReplaced"|"smokeDetected"|"outsideSafeTemperatureRange"|"outsideSafeHumidityRange"|"scheduleMaintenance"|"doorAjar"|"communicationFailure"|"communicationOk"|"burglarAlarm"|"fireAlarm")[]} [supportedNotifications]
   * @property {{name?: string, timestamp?: number, description?: string}} [notification]
   * @property {("adlink"|"aws-kinesis"|"butler"|"crestron"|"dell"|"dmp"|"doorbird"|"dormakaba"|"dsc"|"ecobee"|"epson"|"geovision-rs"|"geovision-as-manager"|"honeywell-vista"|"igor"|"inncom"|"isapi"|"kohost-k7"|"kohost"|"lg"|"lg-webos"|"lapi"|"lirc"|"mews"|"mht"|"paxton"|"pelican-wireless"|"power-shades"|"rachio"|"rebrandly"|"relay"|"rtsp"|"salto"|"salto-irn"|"samsung"|"se"|"sendgrid"|"sonifi"|"stay-n-touch"|"storable"|"twilio"|"unifi"|"valcom"|"vivotek"|"vizio"|"wisenet"|"cloudflare-images"|"cloudflare-stream"|"insperia-privacy")} driver - Driver used to communicate with the object.
   * @property {{iframe?: string, hls?: string, webRTC?: string, rtsp?: string}} [liveStreams]
   * @property {string} [liveStreams.iframe]
   * @property {string} [liveStreams.hls]
   * @property {string} [liveStreams.webRTC]
   * @property {string} [liveStreams.rtsp]
   * @property {{id?: string, driver?: ("cloudflare-stream"|"aws-kinesis"|"digital-watchdog"|"mediamtx"), allowedOrigins?: string[], authRequired?: boolean, iframe?: string, hls?: string, webRTC?: string, rtsp?: string, previewImage?: string}} [liveStream]
   * @property {string} [liveStream.id]
   * @property {("cloudflare-stream"|"aws-kinesis"|"digital-watchdog"|"mediamtx")} [liveStream.driver]
   * @property {string[]} [liveStream.allowedOrigins]
   * @property {boolean} [liveStream.authRequired]
   * @property {string} [liveStream.iframe]
   * @property {string} [liveStream.hls]
   * @property {string} [liveStream.webRTC]
   * @property {string} [liveStream.rtsp] - Local RTSP stream URL
   * @property {string} [liveStream.previewImage] - Source to preview the camera stream
   * @property {string} [systemId] - Identifier of the object, directly related to the system.
   * @property {number} [watts]
   * @property {string} [icon]
   * @property {string} [modelNumber]
   * @property {string} [serialNumber]
   * @property {string} [firmwareVersion]
   */

  /**
   * @param {CameraData} data - The data to initialize the Camera with
   * @constructor
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
    if (data.liveStreams !== undefined) this.liveStreams = data.liveStreams;
    if (data.liveStream !== undefined) this.liveStream = data.liveStream;
    if (data.systemId !== undefined) this.systemId = data.systemId;
    if (data.watts !== undefined) this.watts = data.watts;
    if (data.icon !== undefined) this.icon = data.icon;
    if (data.modelNumber !== undefined) this.modelNumber = data.modelNumber;
    if (data.serialNumber !== undefined) this.serialNumber = data.serialNumber;
    if (data.firmwareVersion !== undefined)
      this.firmwareVersion = data.firmwareVersion;
  }
}

Object.defineProperty(Camera.prototype, "schema", {
  value: {
    $schema: "http://json-schema.org/draft-07/schema",
    $id: "camera.json",
    title: "Camera",
    description: "Any smart camera",
    type: "object",
    properties: {
      id: { $ref: "definitions.json#/definitions/id" },
      name: { type: "string" },
      type: { $ref: "definitions.json#/definitions/type", default: "camera" },
      offline: { type: "boolean" },
      supportedNotifications: {
        $ref: "definitions.json#/definitions/supportedNotifications",
      },
      notification: { $ref: "definitions.json#/definitions/notification" },
      driver: { $ref: "definitions.json#/definitions/driver" },
      liveStreams: {
        type: "object",
        additionalProperties: false,
        $comment:
          "This is now deprecated. Use liveStream instead. This will remain here for backwards compatibility.",
        properties: {
          iframe: { type: ["string", "null"] },
          hls: { type: ["string", "null"] },
          webRTC: { type: ["string", "null"] },
          rtsp: { type: ["string", "null"] },
        },
      },
      liveStream: {
        type: "object",
        additionalProperties: false,
        properties: {
          id: { type: "string" },
          driver: {
            type: "string",
            enum: [
              "cloudflare-stream",
              "aws-kinesis",
              "digital-watchdog",
              "mediamtx",
            ],
          },
          allowedOrigins: { type: "array", items: { type: "string" } },
          authRequired: { type: "boolean" },
          iframe: { type: ["string", "null"] },
          hls: { type: ["string", "null"] },
          webRTC: { type: ["string", "null"] },
          rtsp: {
            type: ["string", "null"],
            description: "Local RTSP stream URL",
            examples: [
              "rtsp://192.168.1.4:544/channels/1",
              "rtsp://10.145.6.129:8554/unicast",
            ],
          },
          previewImage: {
            type: ["string", "null"],
            description: "Source to preview the camera stream",
            examples: [
              "https://example.com/preview.jpg",
              "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QBYRXhpZgAATU0AKgAAAAgAA1EQAAEAAAABAQAAAFERAAQAAAABAAABAgABAA",
            ],
          },
        },
      },
      systemId: { $ref: "definitions.json#/definitions/systemId" },
      watts: { $ref: "definitions.json#/definitions/watts" },
      icon: { type: "string" },
      modelNumber: { type: "string" },
      serialNumber: { type: "string" },
      firmwareVersion: { type: "string" },
    },
    additionalProperties: false,
    required: ["id", "type", "driver"],
  },
});

Object.defineProperty(Camera.prototype, "validator", {
  get: function () {
    return validate;
  },
});
