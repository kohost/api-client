import amqp, {
  Channel,
  Message as AMQPMessage,
  Connection as AMQPConnection,
} from "amqplib";
import crypto from "node:crypto";
import debug from "debug";

import { isFatalError } from "amqplib/lib/connection";

import RequestError from "./Errors/RequestError";
import AuthenticationError from "./Errors/AuthenticationError";
import ValidationError from "./Errors/ValidationError";
import NotFoundError from "./Errors/NotFoundError";
import UnprocessableRequestError from "./Errors/UnprocessableRequestError";

const dbg = debug("kohost:amqp-client");

const HEADER_KEY_ORGANIZATION_ID = "X-Organization-Id";
const HEADER_KEY_PROPERTY_ID = "X-Property-Id";
const HEADER_KEY_DRIVER = "X-Driver";
const HEADER_KEY_COMMAND_NAME = "X-Command-Name";
const HEADER_KEY_EVENT_NAME = "X-Event-Name";

const exchanges = {
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
  },
};

class KohostAMQPClient {
  static get Message() {
    return Message;
  }

  static get exchanges() {
    return exchanges;
  }
  static generateCorrelationId() {
    return crypto.randomUUID();
  }

  static validateMessage(message: Message) {
    if (!message) throw new Error("Message is required");
  }

  static parseError(err: any) {
    let type;
    let message;
    let options = {};
    if (err.message && err.type) {
      const { message: errMessage, type: errType, ...rest } = err;
      type = errType;
      message = errMessage;
      options = rest;
    } else {
      message = "Unknown Error";
    }

    dbg("parsing error", type, message, options);

    switch (type) {
      case "RequestError":
        return new RequestError(message, options);

      case "AuthenticationError":
        return new AuthenticationError(message, options);

      case "ValidationError":
        return new ValidationError(message, options);

      case "NotFoundError":
        return new NotFoundError(message, options);

      case "UnprocessableRequestError":
        return new UnprocessableRequestError(message, options);

      default:
        return new Error(message, options);
    }
  }

  static parseMessage(message: AMQPMessage) {
    let error = null;
    let data = {};
    let query = {};
    let context = {} as any;
    let headers = {} as any;

    const isCommand = message?.properties.type === "Command";
    const isEvent = message?.properties.type === "Event";

    const messageHeaders = message?.properties.headers || {};

    const commandName = messageHeaders[HEADER_KEY_COMMAND_NAME] || null;
    const eventName = messageHeaders[HEADER_KEY_EVENT_NAME] || null;

    if (message.content) {
      try {
        const payload =
          message.properties?.contentType === "application/json"
            ? JSON.parse(message.content.toString())
            : message.content.toString();
        data = payload?.data || {};
        error = payload?.error;
        query = payload?.query || {};
        context = payload?.context || {};
      } catch (error) {
        data = message.content.toString();
      }
    }

    if (message?.properties?.headers) {
      const orgHeader = message.properties.headers[HEADER_KEY_ORGANIZATION_ID];
      const propertyHeader = message.properties.headers[HEADER_KEY_PROPERTY_ID];
      const driverHeader = message.properties.headers[HEADER_KEY_DRIVER];

      if (orgHeader) {
        context.organizationId = orgHeader;
        headers[HEADER_KEY_ORGANIZATION_ID] = orgHeader;
      }

      if (propertyHeader) {
        context.propertyId = propertyHeader;
        headers[HEADER_KEY_PROPERTY_ID] = propertyHeader;
      }

      if (driverHeader) {
        context.driver = driverHeader;
        headers[HEADER_KEY_DRIVER] = driverHeader;
      }
    }

    const parsed = {} as any;

    if (error) parsed.error = this.parseError(error);

    parsed.data = data;
    parsed.query = query;
    parsed.context = context;
    parsed.headers = headers;

    if (isEvent && eventName) parsed.event = eventName;
    else if (isCommand && commandName) parsed.command = commandName;

    dbg("amqp parsed %o", parsed);

    return parsed;
  }

  static getMessage(message: AMQPMessage) {
    if (!message?.content) return null;
    const payload = JSON.parse(message.content.toString());
    const data = payload?.data;
    return data;
  }

  static isFatalError(err: any) {
    return isFatalError(err);
  }

  async createConnection(connection: string, options = {}) {
    return await amqp.connect(connection, options);
  }

  static createMessage(content: any) {
    return new Message(content);
  }

  async createChannel(connection: AMQPConnection) {
    const channel = await connection.createChannel();
    return channel;
  }

  async assertExchange(channel: Channel, { exchange, type, options }) {
    return await channel.assertExchange(exchange, type, options);
  }

  async assertQueue(channel: Channel, { queue, options }) {
    return await channel.assertQueue(queue, options);
  }

  async bindQueue(channel: Channel, { queue, exchange, routingKey, args }) {
    return await channel.bindQueue(queue, exchange, routingKey, args);
  }

  async bindExchange(
    channel: Channel,
    { source, destination, routingKey, args }
  ) {
    return await channel.bindExchange(destination, source, routingKey, args);
  }

  async subscribeToQueue(channel: Channel, { queue, cb, options }) {
    return await channel.consume(queue, cb, options);
  }

  publishToExchange(
    channel: Channel,
    { exchange, routingKey, content, options }
  ) {
    return channel.publish(exchange, routingKey, content, options);
  }
}

interface MessageContent {}

class Message {
  constructor(content) {
    this.toExchange = null;
    this.content = content;
    this.options = {
      contentType: "application/json",
      timestamp: Date.now(),
    };
    this.routingKey = "";
  }

  get correlationId() {
    return this.options.correlationId || null;
  }

  to({ exchange }) {
    if (typeof exchange === "undefined")
      throw new Error("Exchange is required");
    this.toExchange = exchange;
    return this;
  }

  withType(type) {
    this.options.type = type;
    return this;
  }

  withRoutingKey(routingKey) {
    this.routingKey = routingKey;
    return this;
  }

  withHeaders(headers) {
    if (!this.options.headers) this.options.headers = {};
    this.options.headers = { ...this.options.headers, ...headers };
    return this;
  }

  withContext(context) {
    for (let key in context) {
      this.withHeaders({ [key]: context[key] });
    }
    return this;
  }

  withCorrelationId(correlationId: string) {
    this.options.correlationId = correlationId;
    return this;
  }

  withReplyTo(queue) {
    this.options.replyTo = queue;
    return this;
  }

  build() {
    let content = this.content;
    if (content.build && typeof content.build === "function")
      content = content.build();

    return {
      exchange: this.toExchange,
      content: Buffer.from(JSON.stringify(content)),
      options: this.options,
      routingKey: this.routingKey,
    };
  }
}

module.exports = KohostAMQPClient;
