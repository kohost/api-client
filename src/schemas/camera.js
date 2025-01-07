export default {
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
      default: "camera",
    },
    offline: {
      type: "boolean",
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
      $comment:
        "This is now deprecated. Use liveStream instead. This will remain here for backwards compatibility.",
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
        rtsp: {
          type: ["string", "null"],
        },
      },
    },
    liveStream: {
      type: "object",
      additionalProperties: false,
      properties: {
        id: {
          type: "string",
        },
        driver: {
          type: "string",
          enum: ["cloudflare-stream", "aws-kinesis", "digital-watchdog"],
        },
        allowedOrigins: {
          type: "array",
          items: {
            type: "string",
          },
        },
        authRequired: {
          type: "boolean",
        },
        iframe: {
          type: ["string", "null"],
        },
        hls: {
          type: ["string", "null"],
        },
        webRTC: {
          type: ["string", "null"],
        },
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
            "data:image/jpegbase64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QBYRXhpZgAATU0AKgAAAAgAA1EQAAEAAAABAQAAAFERAAQAAAABAAABAgABAA",
          ],
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
  required: ["id", "type", "driver"],
};
