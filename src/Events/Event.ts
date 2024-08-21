import exchanges, { type ExchangeName } from "../utils/amqpExchanges";
import type { Context, Entity } from "../utils/defs";

export abstract class Event {
  //data can be any object;
  data: Record<string, any>;
  context: Context;
  constructor(data: Record<string, any>, context: Context) {
    if (!data) throw new Error("Event data is required");
    this.data = data;
    this.context = context;
  }

  static get type(): string {
    return "Event";
  }

  static get exchange(): ExchangeName {
    return exchanges.DriverEvents.name;
  }

  get entity(): Entity | "entity" {
    return "entity";
  }

  get organizationId(): string {
    return this.context.organizationId ?? "*";
  }

  get propertyId(): string {
    return this.context.propertyId ?? "*";
  }

  get routingKey(): string {
    return `${this.organizationId}.${this.propertyId}.${this.entity}.${this.constructor.name}`;
  }
}
