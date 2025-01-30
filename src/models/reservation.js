/* @ts-nocheck */
/* This file is automatically generated. Do not modify it manually. */

import { Entity } from "./entity";
import { validateReservation as validate } from "../validators";

export class Reservation extends Entity {
  /**
 * @typedef {Object} ReservationData 
 * @property {string} [id] - Identifier of the object.
 * @property {("adlink"|"aws-kinesis"|"butler"|"crestron"|"dell"|"dmp"|"doorbird"|"dormakaba"|"dsc"|"ecobee"|"epson"|"geovision-rs"|"geovision-as-manager"|"honeywell-vista"|"igor"|"inncom"|"isapi"|"kohost-k7"|"kohost"|"lg"|"lg-webos"|"lapi"|"lirc"|"mews"|"mht"|"paxton"|"pelican-wireless"|"power-shades"|"rachio"|"rebrandly"|"relay"|"rtsp"|"salto"|"salto-irn"|"samsung"|"se"|"sendgrid"|"sonifi"|"stay-n-touch"|"storable"|"twilio"|"unifi"|"valcom"|"vivotek"|"vizio"|"wisenet"|"cloudflare-images"|"cloudflare-stream"|"insperia-privacy")} [driver] - Driver used to communicate with the object.
 * @property {string} [primaryGuest]
 * @property {"reservation"} type - Default: "reservation"
 * @property {string[]} [sharedGuests]
 * @property {string} [spaceCategory]
 * @property {string} [space]
 * @property {string} [previousSpace] - Used when there was a space assigned and it changes. Default: null
 * @property {("reserved"|"checkedIn"|"checkedOut"|"cancelled"|"noShow"|"enquired"|"requested"|"optional")} status -  reserved - confirmed by both parties, before check-in
 checkedIn - checked in
 checkedOut - checked out
 cancelled - Cancelled
 noShow - No show
 enquired - Confirmed neither by the customer nor enterprise
 requested - Confirmed by the customer but not the enterprise (waitlist)
 optional - Confirmed by the enterprise but not the customer (holding)
 * @property {boolean} [mobileCheckInSpaceCategoryChanged] - spaceCategory has changed from original.
 * @property {boolean} [mobileCheckInSpaceChanged]
 * @property {("ready"|"blocked"|"preArrivalStepsRequired"|"spaceNotAssigned"|"spaceNotReady"|"checkInTimeNotStarted")} [mobileCheckInStatus]
 * @property {string} [mobileCheckInStatusMessage]
 * @property {string} [confirmationNumber]
 * @property {(string|object)} [expectedCheckInDateTime] - Expected arrival time of guest.
 * @property {(string|object)} checkInDateTime
 * @property {(string|object)} checkOutDateTime
 * @property {number} [adultCount] - Default: 1
 * @property {number} [childCount] - Default: 0
 * @property {{id?: string, price?: number, unit?: ("night"|"stay"|"hour"), isUpgrade?: boolean}[]} [spaceCategoryAvailabilites]
 * @property {{id?: string, name?: string, date?: string, price?: number, tax?: number}[]} [revenue]
 * @property {boolean} [rateSuppressed]
 * @property {string} [payment]
 * @property {string} [company]
 * @property {string} [travelAgent]
 * @property {string} [systemId] - Identifier of the object, directly related to the system.
 * @property {{}} [metadata]
 * @property {(string|object)} [updatedAt]
 */

  /**
   * @param {ReservationData} data - The data to initialize the Reservation with
   * @constructor
   */
  constructor(data) {
    super(data);
    if (data.id !== undefined) this.id = data.id;
    if (data.driver !== undefined) this.driver = data.driver;
    if (data.primaryGuest !== undefined) this.primaryGuest = data.primaryGuest;
    this.type = data.type;
    if (data.sharedGuests !== undefined) this.sharedGuests = data.sharedGuests;
    if (data.spaceCategory !== undefined)
      this.spaceCategory = data.spaceCategory;
    if (data.space !== undefined) this.space = data.space;
    if (data.previousSpace !== undefined)
      this.previousSpace = data.previousSpace;
    this.status = data.status;
    if (data.mobileCheckInSpaceCategoryChanged !== undefined)
      this.mobileCheckInSpaceCategoryChanged =
        data.mobileCheckInSpaceCategoryChanged;
    if (data.mobileCheckInSpaceChanged !== undefined)
      this.mobileCheckInSpaceChanged = data.mobileCheckInSpaceChanged;
    if (data.mobileCheckInStatus !== undefined)
      this.mobileCheckInStatus = data.mobileCheckInStatus;
    if (data.mobileCheckInStatusMessage !== undefined)
      this.mobileCheckInStatusMessage = data.mobileCheckInStatusMessage;
    if (data.confirmationNumber !== undefined)
      this.confirmationNumber = data.confirmationNumber;
    if (data.expectedCheckInDateTime !== undefined)
      this.expectedCheckInDateTime = data.expectedCheckInDateTime;
    this.checkInDateTime = data.checkInDateTime;
    this.checkOutDateTime = data.checkOutDateTime;
    if (data.adultCount !== undefined) this.adultCount = data.adultCount;
    if (data.childCount !== undefined) this.childCount = data.childCount;
    if (data.spaceCategoryAvailabilites !== undefined)
      this.spaceCategoryAvailabilites = data.spaceCategoryAvailabilites;
    if (data.revenue !== undefined) this.revenue = data.revenue;
    if (data.rateSuppressed !== undefined)
      this.rateSuppressed = data.rateSuppressed;
    if (data.payment !== undefined) this.payment = data.payment;
    if (data.company !== undefined) this.company = data.company;
    if (data.travelAgent !== undefined) this.travelAgent = data.travelAgent;
    if (data.systemId !== undefined) this.systemId = data.systemId;
    if (data.metadata !== undefined) this.metadata = data.metadata;
    if (data.updatedAt !== undefined) this.updatedAt = data.updatedAt;
  }

  checkInTime(tz) {
    return new Date(this.checkInDateTime).toLocaleString("default", {
      hour: "numeric",
      minute: "numeric",
      timeZone: tz,
    });
  }
  checkOutTime(tz) {
    return new Date(this.checkOutDateTime).toLocaleString("default", {
      hour: "numeric",
      minute: "numeric",
      timeZone: tz,
    });
  }
  getNights() {
    const start = new Date(this.checkInDateTime);
    const end = new Date(this.checkOutDateTime);
    let nights = Math.round((end - start) / (1000 * 60 * 60 * 24));
    if (nights <= 0) {
      nights = 1;
    }
    return nights;
  }
}

Object.defineProperty(Reservation.prototype, "schema", {
  value: {
    $schema: "http://json-schema.org/draft-07/schema",
    $id: "reservation.json",
    title: "Reservation",
    type: "object",
    required: ["type", "status", "checkInDateTime", "checkOutDateTime"],
    properties: {
      id: { $ref: "definitions.json#/definitions/id" },
      driver: { $ref: "definitions.json#/definitions/driver" },
      primaryGuest: { type: "string" },
      type: { type: "string", default: "reservation", enum: ["reservation"] },
      sharedGuests: { type: "array", items: { type: "string" } },
      spaceCategory: { type: "string" },
      space: { type: ["string", "null"] },
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
      mobileCheckInSpaceChanged: { type: "boolean" },
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
      mobileCheckInStatusMessage: { type: "string" },
      confirmationNumber: { type: "string" },
      expectedCheckInDateTime: {
        type: ["string", "object"],
        format: "date-time",
        description: "Expected arrival time of guest.",
      },
      checkInDateTime: { type: ["string", "object"], format: "date-time" },
      checkOutDateTime: { type: ["string", "object"], format: "date-time" },
      adultCount: { type: "number", default: 1, minimum: 1 },
      childCount: { type: "number", default: 0 },
      spaceCategoryAvailabilites: {
        type: "array",
        items: {
          type: "object",
          properties: {
            id: { type: "string" },
            price: { type: "number" },
            unit: { type: "string", enum: ["night", "stay", "hour"] },
            isUpgrade: { type: "boolean" },
          },
        },
      },
      revenue: { $ref: "definitions.json#/definitions/revenue" },
      rateSuppressed: { type: "boolean" },
      payment: { type: "string" },
      company: { type: "string" },
      travelAgent: { type: "string" },
      systemId: { $ref: "definitions.json#/definitions/systemId" },
      metadata: { $ref: "definitions.json#/definitions/metadata" },
      updatedAt: { $ref: "definitions.json#/definitions/updatedAt" },
    },
  },
});

Object.defineProperty(Reservation.prototype, "validator", {
  get: function () {
    return validate;
  },
});
