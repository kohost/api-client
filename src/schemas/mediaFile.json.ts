import { type Definitions } from "./definitions.json";

const mimeTypeEnums = [
  "image/*",
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/avif",
  "image/svg+xml",
  "application/pdf",
] as const;

export const schema = {
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
      $ref: "definitions.json#/definitions/type",
      default: "mediaFile",
    },
    name: {
      $ref: "definitions.json#/definitions/name",
    },
    fileHash: {
      type: "string",
      description: "Hash of the file.",
    },
    mimeType: {
      type: "string",
      description: "MIME type of the file (e.g. application/pdf).",
      enum: mimeTypeEnums,
    },
    data: {
      type: "string",
      description: "Base64-encoded data of the file.",
    },
    url: {
      type: "string",
      format: "uri",
      description: "URL of the file.",
    },
    width: {
      type: "integer",
      minimum: 0,
      description: "Width in pixels",
    },
    height: {
      type: "integer",
      minimum: 0,
      description: "Height in pixels",
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
      description: "Date when the upload URL expires.",
    },
    createdBy: {
      type: "string",
      description: "User ID of the creator.",
    },
    systemId: {
      $ref: "definitions.json#/definitions/systemId",
    },
  },
  additionalProperties: false,
  required: ["type"],
} as const;

type MediaFileEnums = (typeof mimeTypeEnums)[number];

/**
 * Any media file
 */
export type MediaFileSchema = {
  /** Unique identifier of the file. */
  id?: Definitions["id"];
  type: "mediaFile";
  /** Friendly name of the file */
  name?: Definitions["name"];
  /** Hash of the file. */
  fileHash?: string;
  /** MIME type of the file (e.g. application/pdf). */
  mimeType?: MediaFileEnums;
  /** Base64-encoded data of the file. */
  data?: string;
  /** URL of the file. */
  url?: string;
  /** Width in pixels */
  width?: number;
  /** Height in pixels */
  height?: number;
  /** Size in bytes */
  size?: number;
  uploadUrl?: string;
  /** Date when the upload URL expires. */
  uploadUrlExpires?: Definitions["date"];
  /** User ID of the creator. */
  createdBy?: string;
  systemId?: Definitions["systemId"];
};
