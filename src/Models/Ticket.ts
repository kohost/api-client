// Create the Ticket Model
import { add, compile } from "../utils/schema";
import schema, { properties } from "../schemas/ticket.json";
import Entity from "./Entity";
import MediaFile from "./MediaFile";
import { nanoid } from "nanoid";
import { TicketSchema } from "../types/TicketSchema";

add(schema);
const validator = compile(schema);

class Ticket extends Entity {
  constructor(ticket: TicketSchema) {
    const ticketData = mapConversationData(ticket);
    super(ticketData);
  }

  schema = schema;
  validator = validator;
  validProperties = Object.keys(properties);

  static generateMessageId(len = 16) {
    return nanoid(len);
  }
}

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
