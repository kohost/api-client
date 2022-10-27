// Create the User Model
const schemas = require("../utils/schema");
const schema = require("../schemas/ticket.json");
const Kohost = require("./kohost");

const sortBy = require("lodash.sortby");
const findLast = require("lodash.findlast");

const { nanoid } = require("nanoid");

schemas.add(schema);
const validator = schemas.compile(schema);

class Ticket extends Kohost {
  constructor(data) {
    super(data);
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
    const firstMsg = sorted.find((entry) => entry.user === requester);
    const firstResponse = sorted.find((entry) => entry.user !== requester);

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
      return c.user !== requester;
    });

    if (!lastFromNonRequester) return null;
    else return lastFromNonRequester.user;
  },
});

module.exports = Ticket;
