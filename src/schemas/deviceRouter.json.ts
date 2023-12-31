import { type Definitions } from "./definitions.json";

export const schema = {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "deviceRouter.json",
  title: "Device Router",
  description:
    "A device router contains instructions on where to route devices based on their organization and driver.",
  type: "object",
  required: ["driver", "organization"],
  properties: {
    id: {
      $ref: "definitions.json#/definitions/id",
    },
    type: {
      $ref: "definitions.json#/definitions/type",
      default: "deviceRouter",
    },
    driver: {
      type: "definitions.json#/definitions/driver",
    },
    organization: {
      type: ["string", "null"],
      description: "Reference (id) to the organization that owns this router",
    },
    devices: {
      type: "object",
      additionalProperties: true,
    },
  },
} as const;

export interface DeviceRouterSchema {
  id: Definitions["id"];
  type: "deviceRouter";
  driver: Definitions["driver"];
  organization?: string | null;
  devices: {
    [k: string]: any;
  };
}
