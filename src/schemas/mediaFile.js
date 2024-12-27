module.exports = {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "mediaFile.json",
  title: "Media File",
  description: "Any media file",
  type: "object",
  properties: {
    id: {
      $ref: "definitions.json#/definitions/id",
    },
    type: {
      type: "string",
      default: "mediaFile",
      enum: ["mediaFile"],
    },
    name: {
      type: "string",
    },
    fileHash: {
      type: "string",
    },
    category: {
      type: "string",
      description: "This is the category id",
    },
    mimeType: {
      type: "string",
      enum: [
        "image/*",
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
        "image/avif",
        "image/svg+xml",
        "application/pdf",
      ],
    },
    data: {
      type: "string",
    },
    url: {
      type: "string",
      format: "uri",
    },
    width: {
      type: "integer",
      minimum: 0,
    },
    height: {
      type: "integer",
      minimum: 0,
    },
    size: {
      type: "integer",
      minimum: 0,
      description: "Size in bytes",
    },
    uploadUrl: {
      type: "string",
      format: "uri",
    },
    uploadUrlExpires: {
      $ref: "definitions.json#/definitions/date",
    },
    createdBy: {
      type: "string",
    },
    systemId: {
      $ref: "definitions.json#/definitions/systemId",
    },
  },
  additionalProperties: false,
  required: ["type"],
};
