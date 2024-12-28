// Create the User Model
const schemas = require("../utils/schema");
const schema = require("../schemas/ticket.json");
const Entity = require("./Entity").default;
const MediaFile = require("./MediaFile");

const { nanoid } = require("nanoid");

schemas.add(schema);
const validator = schemas.compile(schema);

class Ticket extends Entity {
  /**
   * @typedef {import("../schemas/TicketSchema").Ticket} TicketType
   * Create a Ticket instance.
   * @constructor
   * @param {TicketType} ticket - The ticket object of type Ticket.
   */
  constructor(ticket) {
    const ticketData = mapConversationData(ticket);
    super(ticketData);
  }

  static generateMessageId(len = 16) {
    return nanoid(len);
  }
}

Object.defineProperty(Ticket.prototype, "schema", {
  value: schema,
});

Object.defineProperty(Ticket.prototype, "validator", {
  get: function () {
    return validator;
  },
});

Object.defineProperty(Ticket, "validProperties", {
  value: Object.keys(schema.properties),
});

function mapConversationData(data) {
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

module.exports = Ticket;
