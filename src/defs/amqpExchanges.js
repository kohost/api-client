const exchanges = {
  // routes commands based on `command-name` header and in many cases `property-id` header
  Commands: {
    name: "kohost.commands",
    type: "headers",
    options: {
      durable: true,
    },
  },
  CommandResponses: {
    name: "kohost.commands.responses",
    type: "topic",
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
  // dead letter exchange
  dlx: {
    name: "kohost.dlx",
    type: "direct",
  },
};

module.exports = exchanges;
