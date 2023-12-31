import { type Definitions } from "./definitions.json";
import { type MediaFileSchema } from "./mediaFile.json";

const categoryDiscriminator = ["space", "product"] as const;

export const schema = {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "category.json",
  title: "Category",
  type: "object",
  required: ["type", "discriminator"],
  properties: {
    id: {
      $ref: "definitions.json#/definitions/id",
    },
    type: {
      $ref: "definitions.json#/definitions/type",
      default: "category",
    },
    name: {
      $ref: "definitions.json#/definitions/name",
    },
    driver: {
      $ref: "definitions.json#/definitions/driver",
    },
    description: {
      type: "string",
    },
    image: {
      $ref: "mediaFile.json",
    },
    rating: {
      type: "number",
      minimum: 0,
      maximum: 10,
      default: 9,
    },
    discriminator: {
      type: "string",
      enum: categoryDiscriminator,
    },
    systemId: {
      $ref: "definitions.json#/definitions/systemId",
    },
  },
} as const;

type CategoryDiscriminator = (typeof categoryDiscriminator)[number];

export type CategorySchema = {
  id: Definitions["id"];
  type: "category";
  name?: Definitions["name"];
  driver?: Definitions["driver"];
  description?: string;
  image?: MediaFileSchema;
  rating?: number;
  discriminator: CategoryDiscriminator;
  systemId?: Definitions["systemId"];
};
