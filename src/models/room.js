/* @ts-nocheck */
/* This file is automatically generated. Do not modify it manually. */

import { Entity } from "./entity";
import { validateRoom as validate } from "../validators";

export class Room extends Entity {
  /**
   * @typedef {Object} RoomData A room represents a physical space of controllable IoT devices
   * @property {string} id - Identifier of the object.
   * @property {"room"} [type] - Default: "room"
   * @property {string} name
   * @property {string} [floor]
   * @property {{id: any, name?: string, type: any, supportedNotifications?: any, notification?: any, driver: any, offline?: boolean, level: number, systemId?: any, watts?: any, icon?: string, modelNumber?: string, serialNumber?: string, firmwareVersion?: string}[]} [dimmers] - Default: []
   * @property {{id: any, name?: string, type: any, discriminator?: ("light"|"fan"|"irrigation"), supportedNotifications?: any, notification?: any, driver: any, offline?: boolean, state: ("on"|"off"), systemId?: any, watts?: any, icon?: string, modelNumber?: string, serialNumber?: string, firmwareVersion?: string}[]} [switches] - Default: []
   * @property {{id: any, name?: any, type: any, driver: any, offline?: boolean, supportedNotifications?: any, notification?: any, currentTemperature?: number, currentHumidity?: number, hvacMode: string, hvacState: ("cooling"|"heating"|"off"), fanMode: string, fanState: ("off"|"low"|"medium"|"high"|"on"), temperatureScale: ("celsius"|"fahrenheit"), humidityScale?: ("absolute"|"relative"), supportedHvacModes: ("cool"|"heat"|"auto"|"off")[], supportedFanModes: ("auto"|"low"|"medium"|"high"|"off"|"on")[], setpoints: {cool?: any, heat?: any, auto?: any}, minAutoDelta?: number, cycleRate?: number, batteryLevel?: any, systemId?: any, watts?: any, icon?: string, modelNumber?: string, serialNumber?: string, firmwareVersion?: string}[]} [thermostats] - Default: []
   * @property {{id: any, name?: string, type: any, offline?: boolean, supportedNotifications?: any, notification?: any, driver: any, state: ("locked"|"unlocked"), mode?: ("normal"|"autoLock"|"emergencyOpen"|"emergencyClose"|"holdOpen"|"lockdown"), supportedModes?: ("normal"|"autoLock"|"emergencyOpen"|"emergencyClose"|"holdOpen"|"lockdown")[], batteryLevel?: any, systemId?: any, watts?: any, icon?: string, modelNumber?: string, serialNumber?: string, firmwareVersion?: string}[]} [locks] - Default: []
   * @property {{id: any, name?: string, type: any, discriminator?: ("basic"|"variable"), supportedNotifications?: any, notification?: any, driver: any, offline?: boolean, position: number, systemId?: any, watts?: any, icon?: string, modelNumber?: string, serialNumber?: string, firmwareVersion?: string}[]} [windowCoverings] - Default: []
   * @property {{id: any, name?: string, type: any, supportedNotifications?: any, notification?: any, driver: any, offline?: boolean, supportedStates: ("privacy"|"service"|"none")[], state: string, systemId?: any, watts?: any, icon?: string, modelNumber?: string, serialNumber?: string, firmwareVersion?: string}[]} [courtesy] - Default: []
   * @property {{id: any, name?: string, type: any, offline?: boolean, supportedNotifications?: any, notification?: any, driver: any, liveStreams?: {iframe?: string, hls?: string, webRTC?: string, rtsp?: string}, liveStream?: {id?: string, driver?: ("cloudflare-stream"|"aws-kinesis"|"digital-watchdog"), allowedOrigins?: string[], authRequired?: boolean, iframe?: string, hls?: string, webRTC?: string, rtsp?: string, previewImage?: string}, systemId?: any, watts?: any, icon?: string, modelNumber?: string, serialNumber?: string, firmwareVersion?: string}[]} [cameras] - Default: []
   * @property {{id: any, type: "mediaSource", discriminator: ("tv"|"dvr"|"appleTv"|"discPlayer"|"mediaPlayer"|"paSystem"|"uncontrolledDevice"), playlists?: {id?: string, name?: string}[], remote?: ("MR22GA"|"XRT260"|"XRT270"|"HOF-16K 1.2"|"219863500"|"SONIFI"|"AKB76039803"|"BN59-01388A"), name?: any, driver: any, offline?: boolean, audio: boolean, video: boolean, powerFeedback?: boolean, volumeFeedback?: boolean, muted?: boolean, volume?: number, brightness?: number, contrast?: number, power?: ("on"|"off"), input?: string, supportedInputs?: string[], supportedOutputs?: string[], command?: ("mute"|"volumeUp"|"volumeDown"|"brightnessUp"|"brightnessDown"|"channelUp"|"channelDown"|"number0"|"number1"|"number2"|"number3"|"number4"|"number5"|"number6"|"number7"|"number8"|"number9"|"lastChannel"|"display"|"favoriteChannel"|"play"|"playing"|"stop"|"stopped"|"pause"|"paused"|"fastForward"|"fastForwarding"|"rewind"|"rewinding"|"instantReplay"|"record"|"ac3"|"pvrMenu"|"guide"|"menu"|"menuUp"|"menuDown"|"menuLeft"|"menuRight"|"pageUp"|"pageDown"|"select"|"exit"|"input"|"power"|"enterChannel"|"enterVolume"|"enterBrightness"|"enterContrast"|"number10"|"number11"|"number12"|"number13"|"number14"|"number15"|"number16"|"number10Plus"|"number20Plus"|"number100"|"dash"|"threeChan"|"threeD"|"sixChan"|"a"|"add"|"alarm"|"am"|"analog"|"angle"|"antenna"|"antennaEast"|"antennaWest"|"aspect"|"audio1"|"audio2"|"audio3"|"audioDumming"|"audioLevelDown"|"audioLevelUp"|"b"|"back"|"c"|"component1"|"component2"|"component3"|"d"|"home"|"list"|"liveTv"|"discreteInputCable"|"powerOff"|"powerOn"|"setupMenu"|"skipForward"|"skipReverse"|"video1"|"video2"|"video3"|"video4"|"video5"|"details"|"hdmi1"|"hdmi2"|"hdmi3"|"cecDeviceList"|"mtsSap"|"red"|"green"|"yellow"|"blue"|"alert"|"order"), supportedNotifications?: any, notification?: any, systemId?: any, watts?: any, icon?: string, modelNumber?: string, serialNumber?: string, firmwareVersion?: string}[]} [mediaSources] - Default: []
   * @property {{id: any, type: any, driver: any, systemId?: any, supportedNotifications?: any, notification?: any, watts?: any, icon?: string, modelNumber?: string, serialNumber?: string, firmwareVersion?: string}[]} [motionSensors] - Default: []
   * @property {{id: any, name?: string, offline?: boolean, type: "alarm", systemId?: any, supportedNotifications?: any, notification?: any, driver: any, areas: {number?: number, name?: string, securityMode?: ("arming"|"disarming"|"armed"|"disarmed"|"alarm")}[], zones: {number?: number, name?: string, secure?: boolean, bypassed?: boolean}[], chime?: boolean, watts?: any, icon?: string, modelNumber?: string, serialNumber?: string, firmwareVersion?: string, address?: any}[]} [alarms] - Default: []
   * @property {(string|object)} [occupiedAt]
   * @property {(string|object)} [createdAt]
   * @property {(string|object)} [updatedAt]
   */

  /**
   * @param {RoomData} data - The data to initialize the Room with
   * @constructor
   */
  constructor(data) {
    super(data);
    if (data.id !== undefined) this.id = data.id;
    if (data.type !== undefined) this.type = data.type;
    if (data.name !== undefined) this.name = data.name;
    if (data.floor !== undefined) this.floor = data.floor;
    if (data.dimmers !== undefined) this.dimmers = data.dimmers;
    if (data.switches !== undefined) this.switches = data.switches;
    if (data.thermostats !== undefined) this.thermostats = data.thermostats;
    if (data.locks !== undefined) this.locks = data.locks;
    if (data.windowCoverings !== undefined)
      this.windowCoverings = data.windowCoverings;
    if (data.courtesy !== undefined) this.courtesy = data.courtesy;
    if (data.cameras !== undefined) this.cameras = data.cameras;
    if (data.mediaSources !== undefined) this.mediaSources = data.mediaSources;
    if (data.motionSensors !== undefined)
      this.motionSensors = data.motionSensors;
    if (data.alarms !== undefined) this.alarms = data.alarms;
    if (data.occupiedAt !== undefined) this.occupiedAt = data.occupiedAt;
    if (data.createdAt !== undefined) this.createdAt = data.createdAt;
    if (data.updatedAt !== undefined) this.updatedAt = data.updatedAt;
  }

  static getDevicePath(type) {
    switch (type) {
      case "tv":
      case "dvr":
      case "appleTv":
      case "discPlayer":
      case "mediaPlayer":
      case "uncontrolledDevice":
      case "mediaSource":
        return "mediaSources";
      case "courtesy":
        return "courtesy";
      case "switch":
        return "switches";
      case "dimmer":
        return "dimmers";
      case "thermostat":
        return "thermostats";
      case "lock":
        return "locks";
      case "windowCovering":
        return "windowCoverings";
      case "camera":
        return "cameras";
      case "motionSensor":
        return "motionSensors";
      case "alarm":
        return "alarms";

      default:
        throw new Error("Invalid device type:" + type);
    }
  }
  static getDeviceTypeFromPath(path) {
    const validPaths = [
      "dimmers",
      "switches",
      "thermostats",
      "locks",
      "windowCoverings",
      "courtesy",
      "cameras",
      "mediaSources",
      "motionSensors",
      "alarms",
    ];
    if (!validPaths.includes(path))
      throw new Error("Invalid device path:" + path);
    switch (path) {
      case "courtesy":
        return path;
      case "switches":
        return "switch";
      default:
        return path.slice(0, -1);
    }
  }

  get hasDimmer() {
    return this.dimmers?.length > 0;
  }
  get hasSwitch() {
    return this.switches?.length > 0;
  }
  get hasWindowCovering() {
    return this.windowCoverings?.length > 0;
  }
  get hasShade() {
    return this.hasWindowCovering;
  }
  get hasThermostat() {
    return this.thermostats?.length > 0;
  }
  get hasClimate() {
    return this.hasThermostat;
  }
  get hasLock() {
    return this.locks?.length > 0;
  }
  get hasCourtesy() {
    return this.courtesy?.length > 0;
  }
  get hasCamera() {
    return this.cameras?.length > 0;
  }
  get hasMedia() {
    return this.mediaSources?.length > 0;
  }
  get hasLight() {
    const hasDiscriminatorLight = this.switches?.some((sw) => {
      return sw.discriminator === "light" || sw.discriminator === "fan";
    });
    return this.hasDimmer || hasDiscriminatorLight;
  }
  get hasAlarm() {
    return this.alarms?.length > 0;
  }
  get occupied() {
    const now = new Date();
    const lastOccupied = new Date(this.occupiedAt);
    const diff = now.getTime() - lastOccupied.getTime();
    return diff < 60 * 60 * 1000;
  }
}

Object.defineProperty(Room.prototype, "schema", {
  value: {
    $schema: "http://json-schema.org/draft-07/schema",
    $id: "room.json",
    title: "Room",
    description:
      "A room represents a physical space of controllable IoT devices",
    type: "object",
    required: ["id", "name"],
    properties: {
      id: { $ref: "definitions.json#/definitions/id" },
      type: { type: "string", enum: ["room"], default: "room" },
      name: { type: "string" },
      floor: { type: "string" },
      dimmers: { type: "array", default: [], items: { $ref: "dimmer.json" } },
      switches: { type: "array", default: [], items: { $ref: "switch.json" } },
      thermostats: {
        type: "array",
        default: [],
        items: { $ref: "thermostat.json" },
      },
      locks: { type: "array", default: [], items: { $ref: "lock.json" } },
      windowCoverings: {
        type: "array",
        default: [],
        items: { $ref: "windowCovering.json" },
      },
      courtesy: {
        type: "array",
        default: [],
        items: { $ref: "courtesy.json" },
      },
      cameras: { type: "array", default: [], items: { $ref: "camera.json" } },
      mediaSources: {
        type: "array",
        default: [],
        items: { $ref: "mediaSource.json" },
      },
      motionSensors: {
        type: "array",
        default: [],
        items: { $ref: "motionSensor.json" },
      },
      alarms: { type: "array", default: [], items: { $ref: "alarm.json" } },
      occupiedAt: { $ref: "definitions.json#/definitions/createdAt" },
      createdAt: { $ref: "definitions.json#/definitions/createdAt" },
      updatedAt: { $ref: "definitions.json#/definitions/updatedAt" },
    },
    additionalProperties: false,
  },
});

Object.defineProperty(Room.prototype, "validator", {
  get: function () {
    return validate;
  },
});
