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
        },
        vendorId: {
          type: "string",
        },
        priority: {
          $ref: "ticket.json#/properties/priority",
        },
        tags: {
          type: "array",
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
  },
  required: ["id", "type", "name", "department"],
};
