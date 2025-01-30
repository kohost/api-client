export default {
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
      enum: ["reservation"],
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
    previousSpace: {
      type: ["string", "null"],
      default: null,
      description: "Used when there was a space assigned and it changes",
    },
    status: {
      type: "string",
      enum: [
        "reserved",
        "checkedIn",
        "checkedOut",
        "cancelled",
        "noShow",
        "enquired",
        "requested",
        "optional",
      ],
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
      enum: [
        "ready",
        "blocked",
        "preArrivalStepsRequired",
        "spaceNotAssigned",
        "spaceNotReady",
        "checkInTimeNotStarted",
      ],
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
            enum: ["night", "stay", "hour"],
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
      $ref: "definitions.json#/definitions/metadata",
    },
    updatedAt: {
      $ref: "definitions.json#/definitions/updatedAt",
    },
  },
};

function checkInTime(tz) {
  return new Date(this.checkInDateTime).toLocaleString("default", {
    hour: "numeric",
    minute: "numeric",
    timeZone: tz,
  });
}

function checkOutTime(tz) {
  return new Date(this.checkOutDateTime).toLocaleString("default", {
    hour: "numeric",
    minute: "numeric",
    timeZone: tz,
  });
}

function getNights() {
  const start = new Date(this.checkInDateTime);
  const end = new Date(this.checkOutDateTime);
  let nights = Math.round((end - start) / (1000 * 60 * 60 * 24));
  if (nights <= 0) {
    nights = 1;
  }
  return nights;
}

export const methods = {
  checkInTime,
  checkOutTime,
  getNights,
};
