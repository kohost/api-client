import amqp, {
  Channel,
  Message as AMQPMessage,
  Connection as AMQPConnection,
  XDeath,
  MessageProperties,
} from "amqplib";
import crypto from "node:crypto";
import debug from "debug";

import defs from "./utils/defs";

import RequestError from "./Errors/RequestError";
import AuthenticationError from "./Errors/AuthenticationError";
import ValidationError from "./Errors/ValidationError";
import NotFoundError from "./Errors/NotFoundError";
import UnprocessableRequestError from "./Errors/UnprocessableRequestError";

const amqpDebugger = debug("kohost:amqp-client");

interface PublishToExchangeOptions {
  exchange: string;
  routingKey: string;
  content: Buffer;
  options: any;
}

interface SubscribeToQueueOptions {
  queue: string;
  cb: (msg: AMQPMessage | null) => void | Promise<void>;
  options?: amqp.Options.Consume;
}

interface BindExchangeOptions {
  source: string;
  destination: string;
  routingKey: string;
  args?: any;
}

interface AssertExchangeOptions {
  exchange: string;
  type: string;
  options: amqp.Options.AssertExchange;
}

interface AssertQueueOptions {
  queue: string;
  options: amqp.Options.AssertQueue;
}

interface BindQueueOptions {
  queue: string;
  exchange: string;
  routingKey: string;
  args?: any;
}

interface ParsedMessage {
  error?: Error;
  data?: string | Record<string, unknown>;
  query?: Record<string, unknown>;
  context?: Record<string, unknown>;
  headers?: Record<string, unknown>;
  event?: string;
  command?: string;
}

export class Client {
  static get Message() {
    return Message;
  }

  static get exchanges() {
    return defs.amqp.exchanges;
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

    amqpDebugger("parsing error", type, message, options);

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

  static parseMessage(message: AMQPMessage): ParsedMessage {
    if (!message) throw new Error("Message is required");
    let error = null;
    let data = {};
    let query = {};
    let context = {} as any;
    let headers = {} as any;

    const isCommand = message?.properties.type === "Command";
    const isEvent = message?.properties.type === "Event";

    const messageHeaders = message?.properties.headers || {};

    const commandName = messageHeaders[defs.HEADER_KEY_COMMAND_NAME] || null;
    const eventName = messageHeaders[defs.HEADER_KEY_EVENT_NAME] || null;

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

    if (message.properties?.headers) {
      const orgHeader =
        message.properties.headers[defs.HEADER_KEY_ORGANIZATION_ID];
      const propertyHeader =
        message.properties.headers[defs.HEADER_KEY_PROPERTY_ID];
      const driverHeader = message.properties.headers[defs.HEADER_KEY_DRIVER];

      if (orgHeader) {
        context.organizationId = orgHeader;
        headers[defs.HEADER_KEY_ORGANIZATION_ID] = orgHeader;
      }

      if (propertyHeader) {
        context.propertyId = propertyHeader;
        headers[defs.HEADER_KEY_PROPERTY_ID] = propertyHeader;
      }

      if (driverHeader) {
        context.driver = driverHeader;
        headers[defs.HEADER_KEY_DRIVER] = driverHeader;
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

    amqpDebugger("amqp parsed %o", parsed);

    return parsed;
  }

  static getMessage(message: AMQPMessage) {
    if (!message?.content) return null;
    const payload = JSON.parse(message.content.toString());
    const data = payload?.data;
    return data;
  }

  static isFatalError(err: any) {
    switch (err && err.code) {
      case 320:
      case 200:
        return false;
      default:
        return true;
    }
  }

  async createConnection(
    connection: string,
    options = {}
  ): Promise<AMQPConnection> {
    return await amqp.connect(connection, options);
  }

  static createMessage(content: any) {
    return new Message(content);
  }

  async createChannel(connection: AMQPConnection) {
    const channel = await connection.createChannel();
    return channel;
  }

  async assertExchange(
    channel: Channel,
    exchangeOpts = {
      exchange: "",
      type: "",
      options: {},
    } as AssertExchangeOptions
  ) {
    return await channel.assertExchange(
      exchangeOpts.exchange,
      exchangeOpts.type,
      exchangeOpts.options
    );
  }

  async assertQueue(
    channel: Channel,
    queueOpts = { queue: "", options: {} } as AssertQueueOptions
  ) {
    return await channel.assertQueue(queueOpts.queue, queueOpts.options);
  }

  async bindQueue(
    channel: Channel,
    queueOpts = {
      queue: "",
      exchange: "",
      routingKey: "",
      args: {},
    } as BindQueueOptions
  ) {
    return await channel.bindQueue(
      queueOpts.queue,
      queueOpts.exchange,
      queueOpts.routingKey,
      queueOpts.args
    );
  }

  async bindExchange(
    channel: Channel,
    options = {
      source: "",
      destination: "",
      routingKey: "",
      args: {},
    } as BindExchangeOptions
  ) {
    return await channel.bindExchange(
      options.destination,
      options.source,
      options.routingKey,
      options.args
    );
  }

  async subscribeToQueue(
    channel: Channel,
    opts = {
      queue: "",
      cb: function () {},
      options: {},
    } as SubscribeToQueueOptions
  ) {
    return await channel.consume(opts.queue, opts.cb, opts.options);
  }

  publishToExchange(
    channel: Channel,
    opts = {
      exchange: "",
      routingKey: "",
      content: Buffer.from(JSON.stringify({})),
      options: {},
    } as PublishToExchangeOptions
  ) {
    return channel.publish(
      opts.exchange,
      opts.routingKey,
      opts.content,
      opts.options
    );
  }
}

export class Message {
  toExchange?: string | null;
  content: any;
  options: {
    contentType: string;
    timestamp: number;
    correlationId: string | null;
    type?: string;
    replyTo?: string;
    headers: {
      [key: string]: string;
    };
  };
  routingKey: string;

  constructor(content: any) {
    this.toExchange = null;
    this.content = content;
    this.options = {
      contentType: "application/json",
      timestamp: Date.now(),
      correlationId: null,
      headers: {},
      replyTo: "",
    };
    this.routingKey = "";
  }

  get correlationId() {
    return this.options.correlationId || null;
  }

  to(options = { exchange: undefined }): Message {
    if (typeof options.exchange === "undefined")
      throw new Error("Exchange is required");
    this.toExchange = options.exchange;
    return this;
  }

  withType(type: string): Message {
    this.options.type = type;
    return this;
  }

  withRoutingKey(routingKey: string): Message {
    this.routingKey = routingKey;
    return this;
  }

  withHeaders(headers = {}): Message {
    if (!this.options.headers) this.options.headers = {};
    this.options.headers = { ...this.options.headers, ...headers };
    return this;
  }

  withContext(context = {}) {
    this.withHeaders(context);
    return this;
  }

  withCorrelationId(correlationId: string) {
    this.options.correlationId = correlationId;
    return this;
  }

  withReplyTo(queue: string) {
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

// re-export AMQPConnection
export { AMQPConnection, Channel, AMQPMessage, MessageProperties };
