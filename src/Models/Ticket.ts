// Create the Ticket Model
import { registerSchema, compileSchema } from "../utils/schema";
import { schema, type TicketSchema } from "../schemas/ticket.json";
import Entity from "./Entity";
import MediaFile from "./MediaFile";
import { nanoid } from "nanoid";

registerSchema(schema);

interface Ticket extends TicketSchema {}
class Ticket extends Entity {
  constructor(ticket: TicketSchema) {
    const ticketData = mapConversationData(ticket);
    super(ticketData);
  }

  static generateMessageId(len: number = 16): string {
    return nanoid(len);
  }
}

Ticket.validator = compileSchema(schema);
Ticket.schema = schema;
Ticket.validProperties = Object.keys(schema.properties);

function mapConversationData(data: TicketSchema) {
  const ticketData = structuredClone(data);
  if (!ticketData.conversation) ticketData.conversation = [];
  ticketData.conversation = ticketData.conversation.map((msg) => {
    if (msg.media) {
      msg.media = new MediaFile(msg.media);
    }
    return msg;
  });
  return ticketData;
}

export default Ticket;
