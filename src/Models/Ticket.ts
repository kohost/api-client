import { FromSchema } from "json-schema-to-ts";
import { definitionsSchema } from "../schemas/definitions";
import { createValidator, registerSchema } from "../utils/validation";
import { ticketSchema } from "./../schemas/ticket";
import { Entity } from "./Entity";

registerSchema(ticketSchema);
const validator = createValidator(ticketSchema);

export type TicketSchema = FromSchema<
  typeof ticketSchema,
  { references: [typeof definitionsSchema] }
>;

export class Ticket extends Entity<TicketSchema> {
  static schema = ticketSchema;
  validator = validator;

  constructor(data: TicketSchema) {
    super(data);
  }
}

// class Ticket extends Entity {
//   /**
//    * @typedef {import("../schemas/TicketSchema").Ticket} TicketType
//    * Create a Ticket instance.
//    * @constructor
//    * @param {TicketType} ticket - The ticket object of type Ticket.
//    */
//   constructor(ticket) {
//     const ticketData = mapConversationData(ticket);
//     super(ticketData);
//   }

//   static generateMessageId(len = 16) {
//     return nanoid(len);
//   }
// }

// Object.defineProperty(Ticket.prototype, "schema", {
//   value: schema,
// });

// Object.defineProperty(Ticket.prototype, "validator", {
//   get: function () {
//     return validator;
//   },
// });

// Object.defineProperty(Ticket, "validProperties", {
//   value: Object.keys(schema.properties),
// });

// function mapConversationData(data) {
//   const ticketData = structuredClone(data);
//   if (!ticketData.conversation) ticketData.conversation = [];
//   ticketData.conversation = ticketData.conversation.map((msg) => {
//     if (msg.media) {
//       msg.media = new MediaFile(msg.media);
//     }
//     return msg;
//   });
//   return ticketData;
// }

// module.exports = Ticket;
