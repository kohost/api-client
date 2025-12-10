import defs, { ISODateString } from "./definitions";
import type { FromSchema } from "json-schema-to-ts";

export const credentialSchema = {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "credential.json",
  title: "Credential",
  type: "object",
  required: ["type", "credential", "expires"],
  additionalProperties: false,
  properties: {
    id: {
      $ref: "definitions.json#/definitions/id",
    },
    type: {
      type: "string",
      default: "credential",
    },
    driver: {
      $ref: "definitions.json#/definitions/driver",
    },
    name: {
      $ref: "definitions.json#/definitions/name",
    },
    discriminator: {
      type: "string",
      enum: [
        "verificationCode",
        "token",
        "mobileKey",
        "pin",
        "publicKey",
        "passkeyChallenge",
        "alarmCode",
      ],
    },
    credential: {
      type: "string",
    },
    userId: {
      type: "string",
    },
    organizationId: {
      type: "string",
    },
    propertyId: {
      type: "string",
    },
    deviceId: {
      type: "string",
    },
    userAgent: {
      type: "string",
    },
    expires: {
      type: ["string", "object", "null"],
      format: "date-time",
    },
    createdAt: {
      $ref: "definitions.json#/definitions/date",
    },
    updatedAt: {
      $ref: "definitions.json#/definitions/date",
    },
    systemId: {
      $ref: "definitions.json#/definitions/systemId",
    },
  },
} as const;

export type CredentialSchema = Omit<
  FromSchema<
    typeof credentialSchema,
    {
      references: [typeof defs];
      deserialize: [
        {
          pattern: {
            format: "date-time";
          };
          output: Date | ISODateString;
        },
      ];
    }
  >,
  "expires"
> & { expires: Date | ISODateString | null };
