import { type Definitions } from "./definitions.json";

export const schema = {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "camera.json",
  title: "Camera",
  description: "Any smart camera",
  type: "object",
  properties: {
    id: {
      $ref: "definitions.json#/definitions/id",
    },
    name: {
      type: "string",
    },
    type: {
      $ref: "definitions.json#/definitions/type",
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
    liveStreams: {
      type: "object",
      additionalProperties: false,
      properties: {
        iframe: {
          type: ["string", "null"],
        },
        hls: {
          type: ["string", "null"],
        },
        webRTC: {
          type: ["string", "null"],
        },
      },
    },
    systemId: {
      $ref: "definitions.json#/definitions/systemId",
    },
    watts: {
      $ref: "definitions.json#/definitions/watts",
    },
  },
  additionalProperties: false,
  required: ["id", "type", "liveStreams", "driver"],
} as const;

export interface CameraSchema {
  id: Definitions["id"];
  name?: string;
  type: "camera";
  supportedNotifications?: Definitions["supportedNotifications"];
  notification?: Definitions["notification"];
  driver: Definitions["driver"];
  liveStreams: {
    iframe: string | null;
    hls: string | null;
    webRTC: string | null;
  };
  systemId?: Definitions["systemId"];
  watts?: Definitions["watts"];
}
