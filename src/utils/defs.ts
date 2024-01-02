const defs = {
  HEADER_KEY_ORGANIZATION_ID: "X-Organization-Id",
  HEADER_KEY_PROPERTY_ID: "X-Property-Id",
  HEADER_KEY_DRIVER: "X-Driver",
  HEADER_KEY_COMMAND_NAME: "X-Command-Name",
  HEADER_KEY_EVENT_NAME: "X-Event-Name",
  HEADER_KEY_API_KEY: "X-Api-Key",
  deviceTypes: [
    "dimmer",
    "switch",
    "thermostat",
    "lock",
    "windowCovering",
    "courtesy",
    "alarm",
    "camera",
    "mediaSource",
    "motionSensor",
    "gateway",
  ],
  amqp: {
    exchanges: {
      // routes commands based on `command-name` header and in many cases `property-id` header
      Commands: {
        name: "kohost.commands",
        type: "headers",
        options: {
          durable: true,
        },
      },
      // routes events based on routing keys
      DriverEvents: {
        name: "kohost.events.drivers",
        type: "topic",
        options: {
          durable: true,
        },
      },
      AppEvents: {
        name: "kohost.events.app",
        type: "topic",
        options: {
          durable: true,
        },
      },
      Direct: {
        name: "kohost.direct",
        type: "direct",
        options: {
          durable: true,
        },
      },
      Replies: {
        name: "kohost.replies",
        type: "topic",
        options: {
          durable: true,
        },
      },
      // dead letter exchange
      dlx: {
        name: "kohost.dlx",
        type: "direct",
        options: {},
      },
    },
  },
} as const;

export default defs;
