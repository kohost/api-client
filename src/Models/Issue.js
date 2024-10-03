// Create the Issue Model
import schema, { properties } from "../schemas/issue.json";
import { add, compile } from "../utils/schema";
import { Entity } from "./Entity";

add(schema);
const validator = compile(schema);

export class Issue extends Entity {
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
  value: Object.keys(properties),
});
