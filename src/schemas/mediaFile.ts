import defs, { ISODateString } from "./definitions";
import type { FromSchema } from "json-schema-to-ts";

export const mediaFileSchema = {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "mediaFile.json",
  title: "Media File",
  description: "Any media file",
  type: "object",
  properties: {
    id: {
      type: "string",
      default: "",
    },
    propertyId: {
      type: "string",
      description: "ID of the property this entity belongs to. Optional — used as a per-document filter inside the org-scoped database.",
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
        "image/heic",
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-powerpoint",
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        "text/plain",
        "text/csv",
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
    previewUrl: {
      type: "string",
      format: "uri",
    },
    previewWidth: {
      type: "integer",
      minimum: 0,
    },
    previewHeight: {
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
  additionalProperties: false,
  required: ["id", "type"],
} as const;

export type MediaFileSchema = FromSchema<
  typeof mediaFileSchema,
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

function createImageVariant(params) {
  if (!this.url) throw new Error("MediaFile has no url");

  const { pathname } = new URL(this.url, "http://localhost");
  if (pathname.includes("/files/")) {
    return this.url + "?" + new URLSearchParams(params);
  }

  if (this.mimeType === "image/*") {
    const query = Object.keys(params)
      .map((key) => `${key}=${params[key]}`)
      .join(",");
    return this.url.replace(/\/public$/, `/${query}`);
  }

  throw new Error("Only dynamic images can have variants");
}

function supportsImageVariants(): boolean {
  if (this.mimeType === "image/*") return true;
  if (!this.url || !this.url.includes("/files/")) return false;
  return (
    typeof this.mimeType === "string" &&
    this.mimeType.startsWith("image/") &&
    this.mimeType !== "image/svg+xml" &&
    this.mimeType !== "image/avif"
  );
}

export const methods = {
  createImageVariant: createImageVariant,
  supportsImageVariants: supportsImageVariants,
};
