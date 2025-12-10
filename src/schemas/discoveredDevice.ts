import defs, { ISODateString } from "./definitions";
import type { FromSchema } from "json-schema-to-ts";

export const discoveredDeviceSchema = {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "discoveredDevice.json",
  title: "Discovered Device",
  description:
    "A device that has been discovered by Kohost, but not yet added to the Kohost system.",
  type: "object",
  required: ["id", "name", "deviceId", "deviceData", "discriminator"],
  properties: {
    id: {
      $ref: "definitions.json#/definitions/id",
    },
    name: {
      type: "string",
    },
    deviceId: {
      type: "string",
    },
    type: {
      type: "string",
      enum: ["discoveredDevice"],
      default: "discoveredDevice",
    },
    discriminator: {
      $ref: "definitions.json#/definitions/type",
    },
    driver: {
      type: "string",
    },
    deviceData: {
      type: "object",
    },
    ignore: {
      type: "boolean",
    },
    organizationId: {
      type: ["string", "null"],
      description: "Reference (id) to the organization that owns this device",
    },
    propertyId: {
      type: ["string", "null"],
      description: "Reference (id) to the property that this device belongs to",
    },
    createdAt: {
      $ref: "definitions.json#/definitions/date",
    },
    updatedAt: {
      $ref: "definitions.json#/definitions/date",
    },
  },
} as const;

export type DiscoveredDeviceSchema = FromSchema<
  typeof discoveredDeviceSchema,
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
>;
