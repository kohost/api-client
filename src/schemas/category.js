export default {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "category.json",
  title: "Category",
  type: "object",
  required: ["id", "type", "discriminator"],
  properties: {
    id: {
      $ref: "definitions.json#/definitions/id",
    },
    type: {
      type: "string",
      enum: ["category"],
      default: "category",
    },
    name: {
      type: "string",
      minLength: 1,
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
      enum: ["space", "product", "mediaFile"],
    },
    systemId: {
      $ref: "definitions.json#/definitions/systemId",
    },
  },
};
