export default {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "deviceRouter.json",
  title: "Device Router",
  description:
    "A device router contains instructions on where to route devices based on their organization and driver.",
  type: "object",
  required: ["driver", "organizationId"],
  additionalProperties: false,
  properties: {
    id: {
      $ref: "definitions.json#/definitions/id",
    },
    type: {
      type: "string",
      default: "deviceRouter",
      enum: ["deviceRouter"],
    },
    driver: {
      type: "string",
    },
    organizationId: {
      type: ["string", "null"],
      description: "Reference (id) to the organization that owns this router",
    },
    devices: {
      type: "object",
      additionalProperties: true,
    },
  },
};
