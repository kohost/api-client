/* @ts-nocheck */
/* This file is automatically generated. Do not modify it manually. */

import { Entity } from "./entity";
import { validateIssue as validate } from "../validators";

/**
 * @typedef {Object} IssueData An issue associated with ticketing and concierge.
 * @property {string} id - Identifier of the object.
 * @property {"issue"} type - Default: "issue"
 * @property {string} name
 * @property {string} [description]
 * @property {string} department
 * @property {{userId?: string, vendorId?: string, priority?: ("low"|"normal"|"high"), tags?: string[]}} [autoAssign]
 * @property {string} [autoAssign.userId]
 * @property {string} [autoAssign.vendorId]
 * @property {("low"|"normal"|"high")} [autoAssign.priority]
 * @property {string[]} [autoAssign.tags]
 * @property {string} [systemKey]
 * @property {boolean} [autoCreateTicket] - Default: true
 * @property {string[]} [excludedResources] - A list of resources that should not trigger notifications of this issue. Default: []
 */

/**
 * An issue associated with ticketing and concierge.
 * @class Issue
 * @extends {Entity}
 */
export class Issue extends Entity {
  /**
   * @constructor
   * @param {IssueData} data - The data to initialize the Issue with
   */
  constructor(data) {
    super(data);
    this.id = data.id;
    this.type = data.type;
    this.name = data.name;
    if (data.description !== undefined) this.description = data.description;
    this.department = data.department;
    if (data.autoAssign !== undefined) this.autoAssign = data.autoAssign;
    if (data.systemKey !== undefined) this.systemKey = data.systemKey;
    if (data.autoCreateTicket !== undefined)
      this.autoCreateTicket = data.autoCreateTicket;
    if (data.excludedResources !== undefined)
      this.excludedResources = data.excludedResources;
  }
}

Object.defineProperty(Issue.prototype, "schema", {
  value: {
    $schema: "http://json-schema.org/draft-07/schema",
    $id: "issue.json",
    title: "Issue",
    description: "An issue associated with ticketing and concierge.",
    type: "object",
    properties: {
      id: { $ref: "definitions.json#/definitions/id" },
      type: { type: "string", enum: ["issue"], default: "issue" },
      name: { type: "string" },
      description: { type: "string" },
      department: { type: "string" },
      autoAssign: {
        type: "object",
        properties: {
          userId: { type: "string" },
          vendorId: { type: "string" },
          priority: { $ref: "ticket.json#/properties/priority" },
          tags: { type: "array", items: { type: "string" } },
        },
      },
      systemKey: { type: "string" },
      autoCreateTicket: { type: "boolean", default: true },
      excludedResources: {
        type: "array",
        description:
          "A list of resources that should not trigger notifications of this issue",
        items: { type: "string" },
        default: [],
      },
    },
    required: ["id", "type", "name", "department"],
  },
});

Object.defineProperty(Issue.prototype, "validator", {
  get: function () {
    return validate;
  },
});
