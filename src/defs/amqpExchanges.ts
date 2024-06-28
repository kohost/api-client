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
    name: "kohost.commandResponses",
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
} as const;

// create a type of all "name" values of the exchanges
export type ExchangeName = (typeof exchanges)[keyof typeof exchanges]["name"];

export const AppEvents = exchanges.AppEvents;
export const Commands = exchanges.Commands;
export const CommandResponses = exchanges.CommandResponses;
export const Direct = exchanges.Direct;
export const DriverEvents = exchanges.DriverEvents;
export const dlx = exchanges.dlx;

export default exchanges;
