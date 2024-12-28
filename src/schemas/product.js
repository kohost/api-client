export default {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "product.json",
  title: "Product",
  type: "object",
  required: ["name", "price", "driver"],
  properties: {
    id: {
      $ref: "definitions.json#/definitions/id",
    },
    type: {
      type: "string",
      default: "product",
      enum: ["product"],
    },
    name: {
      type: "string",
    },
    driver: {
      $ref: "definitions.json#/definitions/driver",
    },
    description: {
      string: "string",
    },
    price: {
      type: "number",
    },
    tax: {
      type: ["number", "null"],
    },
    image: {
      $ref: "mediaFile.json",
    },
    category: {
      type: "string",
    },
    imageUrl: {
      format: "uri",
      pattern: "^https?://",
    },
    systemId: {
      $ref: "definitions.json#/definitions/systemId",
    },
  },
};
