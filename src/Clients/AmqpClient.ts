import {
  Channel,
  connect,
  Connection,
  MessageProperties,
  Options,
  type Message as AMQPMessage,
} from "amqplib";
import { randomUUID } from "crypto";
import { amqp, Context } from "../utils/defs";

import { errorFactory } from "../utils";

const debug = require("debug")("kohost:amqp-client");

const HEADER_KEY_ORGANIZATION_ID = "X-Organization-Id";
const HEADER_KEY_PROPERTY_ID = "X-Property-Id";
const HEADER_KEY_DRIVER = "X-Driver";
const HEADER_KEY_COMMAND_NAME = "X-Command-Name";
const HEADER_KEY_EVENT_NAME = "X-Event-Name";

interface AssertExchangeOptions {
  exchange: amqp.ExchangeName | (string & {});
  type: "direct" | "topic" | "headers" | "fanout" | "match" | (string & {});
  options: Options.AssertExchange;
}

interface AssertQueueOptions {
  queue: string;
  options: Options.AssertQueue;
}

interface BindQueueOptions {
  queue: string;
  exchange: amqp.ExchangeName | (string & {});
  routingKey: string;
  args?: any;
}

interface BindExchangeOptions {
  source: amqp.ExchangeName | (string & {});
  destination: amqp.ExchangeName | (string & {});
  routingKey: string;
  args?: any;
}

interface SubscribeToQueueOptions {
  queue: string;
  cb: (msg: AMQPMessage | null) => any;
  options: Options.Consume;
}

interface PublishToExchangeOptions {
  exchange: amqp.ExchangeName | (string & {});
  routingKey: string;
  content: Buffer;
  options: Options.Publish;
}

export class AMQPClient {
  static generateCorrelationId() {
    return randomUUID();
  }

  static parseError(err: { message: string; type?: string }) {
    let errorType;
    let message;
    let options = {};
    if (err.message && err.type) {
      const { message: errMessage, type: errType, ...rest } = err;
      errorType = errType;
      message = errMessage;
      options = rest;
    } else {
      message = err.message || "Unknown Error";
    }

    debug("parseError", errorType, message, options);

    const AppError =
      typeof errorType === "string" ? errorFactory(errorType) : null;

    if (AppError) return new AppError(message, options);

    return new Error(message, options);
  }

  static parseMessage(message: AMQPMessage) {
    let error: Error | null = null;
    let data: Record<string, any> | string = {};
    let query: Record<string, any> = {};
    let context: Context = {};
    let headers: Record<string, any> = {};

    const isCommand = message.properties.type === "Command";
    const isEvent = message.properties.type === "Event";

    const messageHeaders = message.properties.headers || {};

    const commandName = messageHeaders[HEADER_KEY_COMMAND_NAME] || null;
    const eventName = messageHeaders[HEADER_KEY_EVENT_NAME] || null;

    if (message.content) {
      try {
        const payload =
          message.properties.contentType === "application/json"
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

    if (message.properties.headers) {
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

    const parsed: {
      error: { message: string; type?: string } | null;
      data: Record<string, any> | string;
      query: Record<string, any>;
      context: Context;
      headers: Record<string, any>;
      event?: string;
      command?: string;
    } = {
      error: null,
      data: "",
      query: {},
      context: {},
      headers: {},
    };

    if (error) parsed.error = this.parseError(error);

    parsed.data = data;
    parsed.query = query;
    parsed.context = context;
    parsed.headers = headers;

    if (isEvent && eventName) parsed.event = eventName;
    else if (isCommand && commandName) parsed.command = commandName;

    debug("amqp parsed %o", parsed);

    return parsed;
  }

  static getMessage(message: AMQPMessage) {
    if (!message?.content) return null;
    const payload = JSON.parse(message.content.toString());
    const data = payload?.data;
    return data;
  }

  static isFatalError(err: Error) {
    return isFatalError(err);
  }

  async createConnection(connection: string | Options.Connect, options = {}) {
    return await connect(connection, options);
  }

  static createMessage(content: any) {
    return new Message(content);
  }

  async createChannel(connection: Connection): Promise<Channel> {
    const channel = await connection.createChannel();
    return channel;
  }

  async assertExchange(channel: Channel, opts: AssertExchangeOptions) {
    return await channel.assertExchange(opts.exchange, opts.type, opts.options);
  }

  async assertQueue(channel: Channel, opts: AssertQueueOptions) {
    return await channel.assertQueue(opts.queue, opts.options);
  }

  async bindQueue(channel: Channel, opts: BindQueueOptions) {
    return await channel.bindQueue(
      opts.queue,
      opts.exchange,
      opts.routingKey,
      opts.args
    );
  }

  async bindExchange(channel: Channel, opts: BindExchangeOptions) {
    return await channel.bindExchange(
      opts.destination,
      opts.source,
      opts.routingKey,
      opts.args
    );
  }

  async subscribeToQueue(channel: Channel, opts: SubscribeToQueueOptions) {
    return await channel.consume(opts.queue, opts.cb, opts.options);
  }

  publishToExchange(channel: Channel, opts: PublishToExchangeOptions) {
    return channel.publish(
      opts.exchange,
      opts.routingKey,
      opts.content,
      opts.options
    );
  }
}

export class Message {
  toExchange: amqp.ExchangeName | (string & {});
  content: any;
  routingKey: string;
  options: Partial<MessageProperties>;

  constructor(content: any) {
    this.toExchange = "";
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

  to({ exchange }: { exchange: amqp.ExchangeName }) {
    if (typeof exchange === "undefined")
      throw new Error("Exchange is required");
    this.toExchange = exchange;
    return this;
  }

  withType(type: "Command" | "Event") {
    this.options.type = type;
    return this;
  }

  withRoutingKey(routingKey: string) {
    this.routingKey = routingKey;
    return this;
  }

  withHeaders(headers: Record<string, any>) {
    if (!this.options.headers) this.options.headers = {};
    this.options.headers = { ...this.options.headers, ...headers };
    return this;
  }

  withContext(context: Context) {
    for (let key in context) {
      this.withHeaders({ [key]: context[key] });
    }
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

function isFatalError(error: any) {
  switch (error && error.code) {
    case 320:
    case 200:
      return false;
    default:
      return true;
  }
}
