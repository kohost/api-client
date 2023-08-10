// Create the User Model
const schemas = require("../utils/schema");
const schema = require("../schemas/ticket.json");
const Kohost = require("./Kohost");
const MediaFile = require("./MediaFile");

const sortBy = require("lodash.sortby");
const findLast = require("lodash.findlast");

const { nanoid } = require("nanoid");
const cloneDeep = require("lodash.clonedeep");

schemas.add(schema);
const validator = schemas.compile(schema);

class Ticket extends Kohost {
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

Object.defineProperty(Ticket.prototype, "responseTime", {
  get: function () {
    const conversation = this.conversation;
    const requester = this.requester;

    if (conversation.length === 0) return 0;
    const mapped = conversation.map((msg) => {
      if (typeof msg.timestamp === "string")
        msg.timestamp = new Date(msg.timestamp);
      return msg;
    });
    const sorted = sortBy(mapped, ["timestamp"]);
    const firstMsg = sorted.find((entry) => entry.userId === requester);
    const firstResponse = sorted.find((entry) => entry.userId !== requester);

    if (firstMsg && firstResponse) {
      const firstMsgTime = firstMsg.timestamp.getTime() / 1000;
      const firstResponseTime = firstResponse.timestamp.getTime() / 1000;
      return firstResponseTime - firstMsgTime;
    }

    return 0;
  },
});

Object.defineProperty(Ticket.prototype, "resolutionTime", {
  get: function () {
    if (this.status !== "closed") return 0;
    const createdAt = this.createdAt.getTime() / 1000;
    const solvedAt = this.solvedAt
      ? this.solvedAt.getTime() / 1000
      : this.updatedAt.getTime() / 1000;

    return Math.abs(solvedAt - createdAt);
  },
});

Object.defineProperty(Ticket.prototype, "lastResponder", {
  get: function () {
    const conversation = this.conversation;
    const requester = this.requester;

    const sorted = sortBy(conversation, ["timestamp"]);

    const lastFromNonRequester = findLast(sorted, function (c) {
      return c.userId !== requester;
    });

    if (!lastFromNonRequester) return null;
    else return lastFromNonRequester.userId;
  },
});

function mapConversationData(data) {
  const ticketData = cloneDeep(data);
  ticketData.conversation = ticketData.conversation.map((msg) => {
    if (msg.media) {
      msg.media = new MediaFile(msg.media);
    }
    return msg;
  });
  return ticketData;
}

module.exports = Ticket;
