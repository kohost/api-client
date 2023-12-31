import { type Definitions } from "./definitions.json";
export const schema = {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "shortLink.json",
  title: "Short Link",
  type: "object",
  required: ["destination", "url"],
  properties: {
    id: {
      $ref: "definitions.json#/definitions/id",
    },
    type: {
      type: "string",
      default: "shortLink",
    },
    title: {
      type: "string",
    },
    destination: {
      string: "string",
      format: "uri",
    },
    url: {
      string: "string",
      format: "uri",
    },
    systemId: {
      $ref: "definitions.json#/definitions/systemId",
    },
  },
} as const;

export interface ShortLinkSchema {
  id?: Definitions["id"];
  type: "shortLink";
  title?: string;
  destination: string;
  url: string;
  systemId?: Definitions["systemId"];
}
