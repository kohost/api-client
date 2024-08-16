import { FromSchema } from "json-schema-to-ts";
import { definitionsSchema } from "../schemas/definitions";
import { mediaFileSchema } from "../schemas/mediaFile";
import { createValidator, registerSchema } from "../utils/validation";
import { ticketSchema } from "./../schemas/ticket";
import { Entity } from "./Entity";
import { MediaFile } from "./MediaFile";

registerSchema(ticketSchema);
const validator = createValidator(ticketSchema);

export type TicketSchema = FromSchema<
  typeof ticketSchema,
  { references: [typeof definitionsSchema, typeof mediaFileSchema] }
>;

export class Ticket extends Entity<TicketSchema> {
  static schema = ticketSchema;
  validator = validator;

  constructor(data: TicketSchema) {
    super(mapConversationData(data));
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
