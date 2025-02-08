export default {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "issue.json",
  title: "Issue",
  description: "An issue associated with ticketing and concierge.",
  type: "object",
  properties: {
    id: {
      $ref: "definitions.json#/definitions/id",
    },
    type: {
      type: "string",
      enum: ["issue"],
      default: "issue",
    },
    name: {
      type: "string",
    },
    description: {
      type: "string",
    },
    department: {
      type: "string",
    },
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
        tags: {
          type: "array",
          items: {
            type: "string",
          },
        },
      },
    },
    notify: {
      type: "object",
      properties: {
        userIds: {
          type: "array",
          description:
            "A list of user IDs to notify when a ticket with this issue is created.",
          items: {
            type: "string",
          },
        },
      },
    },
    systemKey: {
      type: "string",
    },
    autoCreateTicket: {
      type: "boolean",
      default: true,
    },
    excludedResources: {
      type: "array",
      description:
        "A list of resources that should not trigger notifications of this issue",
      items: {
        type: "string",
      },
      default: [],
    },
  },
  required: ["id", "type", "name", "department"],
};
