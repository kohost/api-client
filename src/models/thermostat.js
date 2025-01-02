/* eslint-disable */
/* @ts-nocheck */
/* This file is automatically generated. Do not modify it manually. */

import { Entity } from "./entity";
import { validateThermostat as validate } from "../validators";

export class Thermostat extends Entity {
  /**
   * @typedef {Object} ThermostatData Any smart thermostat
   * @property {string} id - Identifier of the object.
   * @property {string} [name]
   * @property {("alarm"|"dimmer"|"switch"|"motionSensor"|"windowCovering"|"camera"|"mediaSource"|"thermostat"|"lock"|"courtesy"|"gateway"|"tv"|"dvr"|"appleTv"|"discPlayer"|"mediaPlayer"|"uncontrolledDevice")} type - Default: "thermostat"
   * @property {("aws-kinesis"|"butler"|"crestron"|"dell"|"dmp"|"doorbird"|"dormakaba"|"dsc"|"ecobee"|"epson"|"geovision-rs"|"geovision-as-manager"|"honeywell-vista"|"igor"|"inncom"|"isapi"|"kohost-k7"|"kohost"|"lg"|"lg-webos"|"lapi"|"lirc"|"mews"|"mht"|"paxton"|"pelican-wireless"|"power-shades"|"rachio"|"rebrandly"|"rtsp"|"salto"|"salto-irn"|"samsung"|"se"|"sendgrid"|"sonifi"|"stay-n-touch"|"storable"|"twilio"|"unifi"|"valcom"|"vizio"|"wisenet"|"cloudflare-images"|"cloudflare-stream"|"insperia-privacy")} driver - Driver used to communicate with the object.
   * @property {boolean} [offline]
   * @property {("button 1"|"button 2"|"button 3"|"button 4"|"button 5"|"idle"|"powerHasBeedApplied"|"acMainsDisconnected"|"acMainsReconnected"|"replaceBatterySoon"|"replaceBatteryNow"|"batteryOk"|"hardwareFailure"|"softwareFailure"|"hardwareFailureWithCode"|"softwareFailureWithCode"|"motionDetection"|"airFilterNeedsCleaned"|"airFilterNeedsReplaced"|"smokeDetected"|"outsideSafeTemperatureRange"|"outsideSafeHumidityRange"|"scheduleMaintenance"|"doorAjar"|"communicationFailure"|"communicationOk"|"burglarAlarm"|"fireAlarm")[]} [supportedNotifications]
   * @property {{name?: string, timestamp?: number, description?: string}} [notification]
   * @property {number} [currentTemperature]
   * @property {number} [currentHumidity]
   * @property {any} hvacMode
   * @property {("cooling"|"heating"|"off")} hvacState
   * @property {any} fanMode
   * @property {("off"|"low"|"medium"|"high"|"on")} fanState
   * @property {("celsius"|"fahrenheit")} temperatureScale - Default: "fahrenheit"
   * @property {("absolute"|"relative")} [humidityScale]
   * @property {("cool"|"heat"|"auto"|"off")[]} supportedHvacModes
   * @property {("auto"|"low"|"medium"|"high"|"off"|"on")[]} supportedFanModes
   * @property {{cool?: any, heat?: any, auto?: any}} setpoints
   * @property {any} [setpoints.cool]
   * @property {any} [setpoints.heat]
   * @property {any} [setpoints.auto]
   * @property {number} [minAutoDelta] - Default: 3
   * @property {number} [cycleRate]
   * @property {number} [batteryLevel]
   * @property {string} [systemId] - Identifier of the object, directly related to the system.
   * @property {number} [watts]
   */

  /**
   * @param {ThermostatData} data - The data to initialize the Thermostat with
   * @constructor
   */
  constructor(data) {
    super(data);
    this.id = data.id;
    this.name = data.name;
    this.type = data.type;
    this.driver = data.driver;
    this.offline = data.offline;
    this.supportedNotifications = data.supportedNotifications;
    this.notification = data.notification;
    this.currentTemperature = data.currentTemperature;
    this.currentHumidity = data.currentHumidity;
    this.hvacMode = data.hvacMode;
    this.hvacState = data.hvacState;
    this.fanMode = data.fanMode;
    this.fanState = data.fanState;
    this.temperatureScale = data.temperatureScale;
    this.humidityScale = data.humidityScale;
    this.supportedHvacModes = data.supportedHvacModes;
    this.supportedFanModes = data.supportedFanModes;
    this.setpoints = data.setpoints;
    this.minAutoDelta = data.minAutoDelta;
    this.cycleRate = data.cycleRate;
    this.batteryLevel = data.batteryLevel;
    this.systemId = data.systemId;
    this.watts = data.watts;
  }
}

Object.defineProperty(Thermostat.prototype, "schema", {
  value: {
    $schema: "http://json-schema.org/draft-07/schema",
    $id: "thermostat.json",
    title: "Thermostat",
    description: "Any smart thermostat",
    type: "object",
    properties: {
      id: { $ref: "definitions.json#/definitions/id" },
      name: { $ref: "definitions.json#/definitions/name" },
      type: {
        $ref: "definitions.json#/definitions/type",
        default: "thermostat",
      },
      driver: { $ref: "definitions.json#/definitions/driver" },
      offline: { type: "boolean" },
      supportedNotifications: {
        $ref: "definitions.json#/definitions/supportedNotifications",
      },
      notification: { $ref: "definitions.json#/definitions/notification" },
      currentTemperature: { type: "number" },
      currentHumidity: { type: "number", minimum: 0 },
      hvacMode: {
        type: "string",
        $ref: "#/properties/supportedHvacModes/items",
      },
      hvacState: {
        type: ["string", "null"],
        enum: ["cooling", "heating", "off", null],
      },
      fanMode: { type: "string", $ref: "#/properties/supportedFanModes/items" },
      fanState: {
        type: ["string", "null"],
        enum: ["off", "low", "medium", "high", "on", null],
      },
      temperatureScale: {
        type: "string",
        enum: ["celsius", "fahrenheit"],
        default: "fahrenheit",
      },
      humidityScale: {
        type: ["string", "null"],
        enum: ["absolute", "relative", null],
      },
      supportedHvacModes: {
        type: "array",
        uniqueItems: true,
        minItems: 2,
        items: { enum: ["cool", "heat", "auto", "off"] },
      },
      supportedFanModes: {
        type: "array",
        uniqueItems: true,
        items: { enum: ["auto", "low", "medium", "high", "off", "on"] },
      },
      setpoints: {
        type: "object",
        additionalProperties: false,
        properties: {
          cool: { $ref: "#/$defs/setpoint" },
          heat: { $ref: "#/$defs/setpoint" },
          auto: { $ref: "#/$defs/setpoint" },
        },
      },
      minAutoDelta: { type: "number", default: 3 },
      cycleRate: { type: "number" },
      batteryLevel: { $ref: "definitions.json#/definitions/batteryLevel" },
      systemId: { $ref: "definitions.json#/definitions/systemId" },
      watts: { $ref: "definitions.json#/definitions/watts" },
    },
    $defs: {
      setpoint: {
        type: "object",
        additionalProperties: false,
        properties: {
          value: { $ref: "#/$defs/setpointValue" },
          min: { $ref: "#/$defs/setpointMinMax" },
          max: { $ref: "#/$defs/setpointMinMax" },
        },
      },
      setpointValue: { type: "number", minimum: 0, maximum: 99 },
      setpointMinMax: { type: ["number", "null"], minimum: 0, maximum: 99 },
    },
    required: [
      "id",
      "type",
      "hvacMode",
      "fanMode",
      "hvacState",
      "fanState",
      "setpoints",
      "temperatureScale",
      "supportedHvacModes",
      "supportedFanModes",
      "driver",
    ],
  },
});

Object.defineProperty(Thermostat.prototype, "validator", {
  get: function () {
    return validate;
  },
});
