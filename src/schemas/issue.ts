import type { FromSchema } from "json-schema-to-ts";
import defs, { ISODateString } from "./definitions";
import { ticketSchema } from "./ticket";

const SYSTEM_CATEGORIES = [
  "hvac",
  "access-control",
  "lighting",
  "shades",
  "irrigation",
  "cameras",
  "alarms",
  "pa",
  "media",
] as const;

const routingOverrideSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    assignedTo: {
      type: ["object", "null"],
      additionalProperties: false,
      required: ["id", "discriminator"],
      properties: {
        id: {
          type: "string",
        },
        discriminator: {
          type: "string",
          enum: ["user", "vendor"],
        },
      },
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
    notify: {
      type: "array",
      items: {
        type: "object",
        required: ["id", "discriminator"],
        additionalProperties: false,
        properties: {
          id: {
            type: "string",
          },
          discriminator: {
            type: "string",
            enum: ["user"],
          },
        },
      },
    },
  },
} as const;

const nullableRoutingOverrideSchema = {
  oneOf: [routingOverrideSchema, { type: "null" }],
} as const;

export const issueSchema = {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "issue.json",
  title: "Issue",
  description: "An issue associated with ticketing and concierge.",
  type: "object",
  required: ["id", "type", "name"],
  additionalProperties: false,
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
    departmentId: {
      type: "string",
      description:
        "The ID of the department that this issue is associated with. Departments are org-level entities, so this is one value per issue (no per-property override).",
    },
    system: {
      type: "object",
      description:
        "Present if this is a System Issue (driven by a device notification). Absence means User Issue.",
      additionalProperties: false,
      required: ["category", "notification"],
      properties: {
        category: {
          type: "string",
          enum: SYSTEM_CATEGORIES,
          description:
            "Canonical System Category slug. Derived from (device.type, device.discriminator) at notification time.",
        },
        notification: {
          $ref: "definitions.json#/definitions/supportedNotifications/items",
          description:
            "The device notification name this issue corresponds to.",
        },
        excludedEntities: {
          type: "array",
          description:
            "Device IDs muted for this issue. Devices in this list never trigger ticket creation.",
          items: {
            type: "string",
          },
          default: [],
        },
      },
    },
    routing: {
      type: "object",
      additionalProperties: false,
      description:
        "Per-property routing overrides on top of a single org-level default. null at any level means suppressed.",
      default: { default: {}, properties: {} },
      properties: {
        default: {
          ...nullableRoutingOverrideSchema,
          description:
            "Org-level default routing applied to every property unless overridden. null means suppressed org-wide.",
        },
        properties: {
          type: "object",
          description:
            "Sparse per-property overrides keyed by propertyId. Fields omitted from an entry fall back to the org-level default. null entry means suppressed at that property.",
          additionalProperties: nullableRoutingOverrideSchema,
          default: {},
        },
      },
    },
    createdAt: {
      $ref: "definitions.json#/definitions/date",
    },
    updatedAt: {
      $ref: "definitions.json#/definitions/date",
    },
    deletedAt: {
      $ref: "definitions.json#/definitions/date",
    },
  },
} as const;

export type IssueSchema = FromSchema<
  typeof issueSchema,
  {
    references: [typeof defs, typeof ticketSchema];
    deserialize: [
      {
        pattern: {
          format: "date-time";
        };
        output: Date | ISODateString;
      },
    ];
  }
>;
