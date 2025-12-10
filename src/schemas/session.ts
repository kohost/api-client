import defs, { ISODateString } from "./definitions";
import type { FromSchema } from "json-schema-to-ts";
import type { policySchema } from "./policy";

export const sessionSchema = {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "session.json",
  title: "Session",
  type: "object",
  required: [
    "id",
    "type",
    "userId",
    "organizationId",
    "userAgent",
    "expires",
    "data",
  ],
  additionalProperties: false,
  properties: {
    id: {
      $ref: "definitions.json#/definitions/id",
    },
    type: {
      type: "string",
      default: "session",
      enum: ["session"],
    },
    userId: {
      type: "string",
    },
    organizationId: {
      type: "string",
    },
    userAgent: {
      type: "string",
    },
    expires: {
      $ref: "definitions.json#/definitions/date",
    },
    data: {
      type: "object",
      additionalProperties: true,
      required: ["phoneVerified", "properties", "organizationId"],
      properties: {
        phoneVerified: {
          type: "boolean",
        },
        properties: {
          type: "array",
          items: {
            type: "object",
            additionalProperties: false,
            properties: {
              id: {
                type: "string",
              },
              roles: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              spaces: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              rooms: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              policies: {
                type: "array",
                items: {
                  $ref: "policy.json#",
                },
              },
            },
          },
        },
        organizationId: {
          type: "string",
        },
      },
    },
    createdAt: {
      $ref: "definitions.json#/definitions/date",
    },
    updatedAt: {
      $ref: "definitions.json#/definitions/date",
    },
  },
} as const;

export type SessionSchema = FromSchema<
  typeof sessionSchema,
  {
    references: [typeof defs, typeof policySchema];
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
