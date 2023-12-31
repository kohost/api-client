import { type Definitions } from "./definitions.json";

const spaceDisciminator = [
  "classRoom",
  "hotelRoom",
  "office",
  "building",
  "commonArea",
  "conferenceRoom",
  "lobby",
  "gym",
  "pool",
  "restaurant",
] as const;

const housekeepingStatus = ["clean", "dirty", "inspected", "pickup"] as const;
const serviceStatus = ["inService", "outOfOrder", "outOfService"] as const;

export const schema = {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "space.json",
  title: "Space",
  type: "object",
  properties: {
    id: {
      $ref: "definitions.json#/definitions/id",
    },
    name: {
      type: "string",
      minLength: 1,
    },
    type: {
      type: "string",
      default: "space",
    },
    discriminator: {
      type: "string",
      enum: spaceDisciminator,
    },
    driver: {
      $ref: "definitions.json#/definitions/driver",
    },
    category: {
      type: "string",
      description: "This is the category id",
    },
    rooms: {
      type: "array",
      items: {
        type: "string",
      },
    },
    subGroups: {
      type: "array",
      items: {
        type: "string",
      },
    },
    occupied: {
      type: "boolean",
    },
    eco: {
      type: "object",
      additionalProperties: false,
      default: {
        active: false,
        allowed: false,
      },
      properties: {
        active: {
          type: "boolean",
          default: false,
        },
        activatedAt: {
          type: ["string", "object"],
          format: "date-time",
        },
        allowed: {
          type: "boolean",
          default: false,
        },
      },
    },
    features: {
      type: "array",
      items: {
        type: "string",
      },
    },
    maximumOccupancy: {
      type: "number",
      minimum: 1,
    },
    housekeepingStatus: {
      type: "string",
      enum: housekeepingStatus,
    },
    serviceStatus: {
      type: "string",
      enum: serviceStatus,
    },
    systemId: {
      $ref: "definitions.json#/definitions/systemId",
    },
  },
  if: {
    properties: { type: { const: "hotelRoom" } },
  },
  then: {
    required: [
      "name",
      "type",
      "features",
      "maximumOccupancy",
      "housekeepingStatus",
      "serviceStatus",
    ],
    properties: {
      features: {
        default: [],
      },
      maximumOccupancy: {
        default: 2,
      },
      housekeepingStatus: {
        default: "dirty",
      },
      serviceStatus: {
        default: "inService",
      },
    },
  },
  else: {
    required: ["name", "type"],
  },
} as const;

type SpaceDisciminator = (typeof spaceDisciminator)[number];
type HousekeepingStatus = (typeof housekeepingStatus)[number];
type ServiceStatus = (typeof serviceStatus)[number];

export interface SpaceSchema {
  id: Definitions["id"];
  name: string;
  type: "space";
  discriminator: SpaceDisciminator;
  driver: Definitions["driver"];
  category?: string;
  rooms?: string[];
  subGroups?: string[];
  occupied?: boolean;
  eco?: {
    active: boolean;
    activatedAt?: Definitions["date"];
    allowed: boolean;
  };
  features?: string[];
  maximumOccupancy?: number;
  housekeepingStatus?: HousekeepingStatus;
  serviceStatus?: ServiceStatus;
  systemId?: Definitions["systemId"];
}
