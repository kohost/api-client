// Create the Issue Model
const schemas = require("../utils/schema");
const schema = require("../schemas/issue.json");
const Entity = require("./Entity");

schemas.add(schema);
const validator = schemas.compile(schema);

class Issue extends Entity {
  /**
   * @typedef {import("../schemas/IssueSchema").Issue} IssueType
   * Create a Ticket instance.
   * @constructor
   * @param {IssueType} issue - The ticket object of type Ticket.
   */
  constructor(issue) {
    super(issue);
  }
}

Object.defineProperty(Issue.prototype, "schema", {
  value: schema,
});

Object.defineProperty(Issue.prototype, "validator", {
  get: function () {
    return validator;
  },
});

Object.defineProperty(Issue, "validProperties", {
  value: Object.keys(schema.properties),
});

module.exports = Issue;
