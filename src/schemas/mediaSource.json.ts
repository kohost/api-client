import { type Definitions } from "./definitions.json";

const discriminatorEnums = [
  "tv",
  "dvr",
  "appleTv",
  "discPlayer",
  "mediaPlayer",
  "uncontrolledDevice",
] as const;

const commandEnums = [
  "mute",
  "volumeUp",
  "volumeDown",
  "channelUp",
  "channelDown",
  "number0",
  "number1",
  "number2",
  "number3",
  "number4",
  "number5",
  "number6",
  "number7",
  "number8",
  "number9",
  "lastChannel",
  "display",
  "favoriteChannel",
  "play",
  "stop",
  "pause",
  "fastForward",
  "rewind",
  "instantReplay",
  "record",
  "ac3",
  "pvrMenu",
  "guide",
  "menu",
  "menuUp",
  "menuDown",
  "menuLeft",
  "menuRight",
  "pageUp",
  "pageDown",
  "select",
  "exit",
  "input",
  "power",
  "enterChannel",
  "enterVolume",
  "number10",
  "number11",
  "number12",
  "number13",
  "number14",
  "number15",
  "number16",
  "number10Plus",
  "number20Plus",
  "number100",
  "dash",
  "threeChan",
  "threeD",
  "sixChan",
  "a",
  "add",
  "alarm",
  "am",
  "analog",
  "angle",
  "antenna",
  "antennaEast",
  "antennaWest",
  "aspect",
  "audio1",
  "audio2",
  "audio3",
  "audioDumming",
  "audioLevelDown",
  "audioLevelUp",
  "b",
  "back",
  "c",
  "component1",
  "component2",
  "component3",
  "d",
  "home",
  "list",
  "liveTv",
  "discreteInputCable",
  "powerOff",
  "powerOn",
  "setupMenu",
  "skipForward",
  "skipReverse",
  "video1",
  "video2",
  "video3",
  "video4",
  "video5",
  "details",
  "hdmi1",
  "hdmi2",
  "hdmi3",
  "cecDeviceList",
  "mtsSap",
  "red",
  "green",
  "yellow",
  "blue",
  "alert",
  "order",
] as const;

const powerEnums = ["on", "off"] as const;

const remoteEnums = ["MR22GA"] as const;

export const schema = {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "mediaSource.json",
  title: "Media Source",
  description: "Any media source",
  type: "object",
  required: ["id", "type", "discriminator", "audio", "video", "driver"],
  properties: {
    id: {
      $ref: "definitions.json#/definitions/id",
    },
    type: {
      type: "string",
      default: "mediaSource",
    },
    discriminator: {
      type: "string",
      enum: discriminatorEnums,
    },
    remote: {
      type: "string",
      enum: remoteEnums,
    },
    name: {
      $ref: "definitions.json#/definitions/name",
    },
    driver: {
      $ref: "definitions.json#/definitions/driver",
    },
    offline: {
      type: "boolean",
    },
    audio: {
      type: "boolean",
    },
    video: {
      type: "boolean",
    },
    powerFeedback: {
      type: "boolean",
    },
    volumeFeedback: {
      type: "boolean",
    },
    muted: {
      type: "boolean",
    },
    volume: {
      type: "number",
      minimum: 0,
      maximum: 100,
    },
    power: {
      type: "string",
      enum: powerEnums,
    },
    input: {
      type: "string",
      $ref: "#/properties/supportedInputs/items",
    },
    supportedInputs: {
      type: "array",
      items: {
        type: "string",
      },
    },
    command: {
      type: ["string", "null"],
      enum: commandEnums,
    },
    supportedNotifications: {
      $ref: "definitions.json#/definitions/supportedNotifications",
    },
    notification: {
      $ref: "definitions.json#/definitions/notification",
    },
    systemId: {
      $ref: "definitions.json#/definitions/systemId",
    },
    watts: {
      $ref: "definitions.json#/definitions/watts",
    },
  },
  additionalProperties: false,
} as const;

type MediaSourceDiscriminator = (typeof discriminatorEnums)[number];
type MediaSourceCommand = (typeof commandEnums)[number];
type MediaSourcePower = (typeof powerEnums)[number];
type MediaSourceRemote = (typeof remoteEnums)[number];

export interface MediaSourceSchema {
  id: Definitions["id"];
  name?: string;
  type: "mediaSource";
  discriminator: MediaSourceDiscriminator;
  remote?: MediaSourceRemote;
  driver: Definitions["driver"];
  offline?: boolean;
  audio: boolean;
  video: boolean;
  powerFeedback?: boolean;
  volumeFeedback?: boolean;
  muted?: boolean;
  volume?: number;
  power?: MediaSourcePower;
  input?: string;
  supportedInputs?: string[];
  command?: MediaSourceCommand | null;
  supportedNotifications?: Definitions["supportedNotifications"];
  notification?: Definitions["notification"];
  systemId?: Definitions["systemId"];
  watts?: Definitions["watts"];
}
