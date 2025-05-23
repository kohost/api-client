/* @ts-nocheck */
/* This file is automatically generated. Do not modify it manually. */

import { Entity } from "./entity";
import { validateIssue as validate } from "../validate";

/**
 * @typedef {Object} IssueData An issue associated with ticketing and concierge.
 * @property {string} id - Identifier of the object.
 * @property {"issue"} type - Default: "issue"
 * @property {string} name
 * @property {string} [description]
 * @property {string} department
 * @property {{userId?: string, vendorId?: string, priority?: ("low"|"normal"|"high"), tags?: string[]}} [autoAssign]
 * @property {string} [autoAssign.userId] - The user ID to assign tickets with this issue to.
 * @property {string} [autoAssign.vendorId] - The vendor ID to assign tickets with this issue to.
 * @property {("low"|"normal"|"high")} [autoAssign.priority] - The priority to assign tickets with this issue to.
 * @property {string[]} [autoAssign.tags]
 * @property {{id: string, discriminator: "user"}[]} [notify] - A list of entities to notify when this issue is triggered.. Default: []
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
    if (data.notify !== undefined) this.notify = data.notify;
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
    required: ["id", "type", "name", "department"],
    additionalProperties: false,
    properties: {
      id: { $ref: "definitions.json#/definitions/id" },
      type: { type: "string", enum: ["issue"], default: "issue" },
      name: { type: "string" },
      description: { type: "string" },
      department: { type: "string" },
      autoAssign: {
        type: "object",
        properties: {
          userId: {
            type: "string",
            description: "The user ID to assign tickets with this issue to.",
          },
          vendorId: {
            type: "string",
            description: "The vendor ID to assign tickets with this issue to.",
          },
          priority: {
            $ref: "ticket.json#/properties/priority",
            description: "The priority to assign tickets with this issue to.",
          },
          tags: { type: "array", items: { type: "string" } },
        },
      },
      notify: {
        type: "array",
        description:
          "A list of entities to notify when this issue is triggered.",
        default: [],
        items: {
          type: "object",
          required: ["id", "discriminator"],
          properties: {
            id: {
              type: "string",
              description: "The ID of the entity to notify.",
            },
            discriminator: { type: "string", enum: ["user"] },
          },
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
  },
});

Object.defineProperty(Issue.prototype, "validator", {
  get: function () {
    return validate;
  },
});
