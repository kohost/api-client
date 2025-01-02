/* eslint-disable */
/* @ts-nocheck */
/* This file is automatically generated. Do not modify it manually. */

import { Entity } from "./entity";
import { validateSystemUser as validate } from "../validators";

export class SystemUser extends Entity {
  /**
   * @typedef {Object} SystemUserData A system user is a user that originated from an external 3rd party system.
   * @property {string} [id] - Identifier of the object.
   * @property {"systemUser"} [type] - Default: "systemUser"
   * @property {("aws-kinesis"|"butler"|"crestron"|"dell"|"dmp"|"doorbird"|"dormakaba"|"dsc"|"ecobee"|"epson"|"geovision-rs"|"geovision-as-manager"|"honeywell-vista"|"igor"|"inncom"|"isapi"|"kohost-k7"|"kohost"|"lg"|"lg-webos"|"lapi"|"lirc"|"mews"|"mht"|"paxton"|"pelican-wireless"|"power-shades"|"rachio"|"rebrandly"|"rtsp"|"salto"|"salto-irn"|"samsung"|"se"|"sendgrid"|"sonifi"|"stay-n-touch"|"storable"|"twilio"|"unifi"|"valcom"|"vizio"|"wisenet"|"cloudflare-images"|"cloudflare-stream"|"insperia-privacy")} [driver] - Driver used to communicate with the object.
   * @property {string} firstName
   * @property {string} lastName
   * @property {string} [phone]
   * @property {string} [email]
   * @property {{id?: string, line1?: string, line2?: string, line3?: string, city?: string, state?: string, postalCode?: string, countryCode?: string}} [address]
   * @property {string} [photo]
   * @property {string} [jobTitle]
   * @property {string} [dob]
   * @property {("male"|"female")} [gender]
   * @property {("Guest"|"User"|"Manager"|"Maintenance"|"Administrator"|"SuperAdmin")[]} [roles]
   * @property {string} [nationality]
   * @property {string[]} [notes]
   * @property {{id?: any, type: "mediaFile", name?: string, fileHash?: string, category?: string, mimeType?: ("image/*"|"image/jpeg"|"image/png"|"image/gif"|"image/webp"|"image/avif"|"image/svg+xml"|"application/pdf"), data?: string, url?: string, width?: number, height?: number, size?: number, uploadUrl?: string, uploadUrlExpires?: any, createdBy?: string, systemId?: any}[]} [files]
   * @property {{id?: any, type: ("driversLicense"|"passport"|"identityCard"|"visa"), number?: any, maskedNumber?: any, encryptedNumber?: any, issued?: (string|object), expires?: (string|object), verified?: boolean, matched?: boolean, firstName?: string, lastName?: string, issuingCountry?: any, systemId?: any}[]} [identifications]
   * @property {{id?: any, type: ("amex"|"visa"|"masterCard"|"maestro"|"discover"|"diners"|"jcb"|"applePay"|"alipay"|"chinaUnionPay"|"vpay"), enabled?: boolean, storageData?: string, maskedNumber: any, issued?: string, expires: any, systemId?: any}[]} [payments]
   * @property {{id?: string, name?: string, date?: string, price?: number, tax?: number}[]} [revenue]
   * @property {(string|object)} [createdAt]
   * @property {(string|object)} [updatedAt]
   * @property {string} [systemId] - Identifier of the object, directly related to the system.
   */

  /**
   * @param {SystemUserData} data - The data to initialize the SystemUser with
   * @constructor
   */
  constructor(data) {
    super(data);
    this.id = data.id;
    this.type = data.type;
    this.driver = data.driver;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.phone = data.phone;
    this.email = data.email;
    this.address = data.address;
    this.photo = data.photo;
    this.jobTitle = data.jobTitle;
    this.dob = data.dob;
    this.gender = data.gender;
    this.roles = data.roles;
    this.nationality = data.nationality;
    this.notes = data.notes;
    this.files = data.files;
    this.identifications = data.identifications;
    this.payments = data.payments;
    this.revenue = data.revenue;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.systemId = data.systemId;
  }
}

Object.defineProperty(SystemUser.prototype, "schema", {
  value: {
    $schema: "http://json-schema.org/draft-07/schema",
    $id: "systemUser.json",
    title: "System User",
    description:
      "A system user is a user that originated from an external 3rd party system.",
    type: "object",
    required: ["firstName", "lastName"],
    properties: {
      id: { $ref: "definitions.json#/definitions/id" },
      type: { type: "string", default: "systemUser", enum: ["systemUser"] },
      driver: { $ref: "definitions.json#/definitions/driver" },
      firstName: { type: "string" },
      lastName: { type: "string" },
      phone: { type: ["string", "null"], pattern: "^\\+[0-9]{1,14}$" },
      email: { type: ["string", "null"], format: "email" },
      address: { $ref: "definitions.json#/definitions/address" },
      photo: { type: "string" },
      jobTitle: { type: "string" },
      dob: { type: "string" },
      gender: { type: "string", enum: ["male", "female"] },
      roles: {
        type: "array",
        items: {
          type: "string",
          enum: [
            "Guest",
            "User",
            "Manager",
            "Maintenance",
            "Administrator",
            "SuperAdmin",
          ],
        },
      },
      nationality: { type: "string", minLength: 2, maxLength: 2 },
      notes: { type: "array", items: { type: "string" } },
      files: { type: "array", items: { $ref: "mediaFile.json#" } },
      identifications: {
        type: "array",
        items: { $ref: "identification.json#" },
      },
      payments: { type: "array", items: { $ref: "payment.json#" } },
      revenue: { $ref: "definitions.json#/definitions/revenue" },
      createdAt: { $ref: "definitions.json#/definitions/createdAt" },
      updatedAt: { $ref: "definitions.json#/definitions/updatedAt" },
      systemId: { $ref: "definitions.json#/definitions/systemId" },
    },
  },
});

Object.defineProperty(SystemUser.prototype, "validator", {
  get: function () {
    return validate;
  },
});
