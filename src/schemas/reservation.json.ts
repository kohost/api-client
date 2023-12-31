import { type Definitions } from "./definitions.json";

const reservationStatus = [
  "reserved",
  "checkedIn",
  "checkedOut",
  "cancelled",
  "noShow",
  "enquired",
  "requested",
  "optional",
] as const;

const mobileCheckInStatus = [
  "ready",
  "blocked",
  "preArrivalStepsRequired",
  "spaceNotAssigned",
  "spaceNotReady",
  "checkInTimeNotStarted",
] as const;

const spaceUpgradeUnits = ["night", "stay", "hour"] as const;

export const schema = {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "reservation.json",
  title: "Reservation",
  type: "object",
  required: ["type", "status", "checkInDateTime", "checkOutDateTime"],
  properties: {
    id: {
      $ref: "definitions.json#/definitions/id",
    },
    driver: {
      $ref: "definitions.json#/definitions/driver",
    },
    primaryGuest: {
      type: "string",
    },
    type: {
      type: "string",
      default: "reservation",
    },
    sharedGuests: {
      type: "array",
      items: {
        type: "string",
      },
    },
    spaceCategory: {
      type: "string",
    },
    space: {
      type: ["string", "null"],
    },
    status: {
      type: "string",
      enum: reservationStatus,
      description:
        " reserved - confirmed by both parties, before check-in\n checkedIn - checked in\n checkedOut - checked out\n cancelled - Cancelled\n noShow - No show\n enquired - Confirmed neither by the customer nor enterprise\n requested - Confirmed by the customer but not the enterprise (waitlist)\n optional - Confirmed by the enterprise but not the customer (holding)",
    },
    mobileCheckInSpaceCategoryChanged: {
      type: "boolean",
      description: "spaceCategory has changed from original.",
    },
    mobileCheckInSpaceChanged: {
      type: "boolean",
    },
    mobileCheckInStatus: {
      type: "string",
      enum: mobileCheckInStatus,
    },
    mobileCheckInStatusMessage: {
      type: "string",
    },
    confirmationNumber: {
      type: "string",
    },
    expectedCheckInDateTime: {
      type: ["string", "object"],
      format: "date-time",
      description: "Expected arrival time of guest.",
    },
    checkInDateTime: {
      type: ["string", "object"],
      format: "date-time",
    },
    checkOutDateTime: {
      type: ["string", "object"],
      format: "date-time",
    },
    adultCount: {
      type: "number",
      default: 1,
      minimum: 1,
    },
    childCount: {
      type: "number",
      default: 0,
    },
    spaceCategoryAvailabilites: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: {
            type: "string",
          },
          price: {
            type: "number",
          },
          unit: {
            type: "string",
            enum: spaceUpgradeUnits,
          },
          isUpgrade: {
            type: "boolean",
          },
        },
      },
    },
    revenue: {
      $ref: "definitions.json#/definitions/revenue",
    },
    rateSuppressed: {
      type: "boolean",
    },
    payment: {
      type: "string",
    },
    company: {
      type: "string",
    },
    travelAgent: {
      type: "string",
    },
    systemId: {
      $ref: "definitions.json#/definitions/systemId",
    },
    metadata: {
      ref: "definitions.json#/definitions/metadata",
    },
    updatedAt: {
      $ref: "definitions.json#/definitions/updatedAt",
    },
  },
} as const;

type ReservationStatus = (typeof reservationStatus)[number];
type MobileCheckInStatus = (typeof mobileCheckInStatus)[number];
type SpaceUpgradeUnits = (typeof spaceUpgradeUnits)[number];

export interface ReservationSchema {
  id: Definitions["id"];
  driver: Definitions["driver"];
  primaryGuest?: string;
  type: "reservation";
  sharedGuests?: string[];
  spaceCategory?: string;
  space?: string | null;
  status: ReservationStatus;
  mobileCheckInSpaceCategoryChanged?: boolean;
  mobileCheckInSpaceChanged?: boolean;
  mobileCheckInStatus?: MobileCheckInStatus;
  mobileCheckInStatusMessage?: string;
  confirmationNumber?: string;
  expectedCheckInDateTime?: string | Date;
  checkInDateTime: string | Date;
  checkOutDateTime: string | Date;
  adultCount?: number;
  childCount?: number;
  spaceCategoryAvailabilites?: {
    id: string;
    price: number;
    unit: SpaceUpgradeUnits;
    isUpgrade: boolean;
  }[];
  revenue?: Definitions["revenue"];
  rateSuppressed?: boolean;
  payment?: string;
  company?: string;
  travelAgent?: string;
  systemId?: Definitions["systemId"];
  metadata?: Definitions["metadata"];
  updatedAt?: Definitions["updatedAt"];
}
