/* @ts-nocheck */
/* This file is automatically generated. Do not modify it manually. */

import { Entity } from "./entity";
import { validateSystemUser as validate } from "../validators";

/**
 * @typedef {Object} SystemUserData A system user is a user that originated from an external 3rd party system.
 * @property {string} id - Identifier of the object.
 * @property {"systemUser"} [type] - Default: "systemUser"
 * @property {("adlink"|"aws-kinesis"|"bacnet"|"butler"|"crestron"|"dell"|"distech"|"dmp"|"doorbird"|"dormakaba"|"dsc"|"ecobee"|"epson"|"geovision-rs"|"geovision-as-manager"|"honeywell-vista"|"igor"|"inncom"|"isapi"|"kohost-k7"|"kohost"|"lg"|"lg-webos"|"lapi"|"lirc"|"mews"|"mht"|"paxton"|"pelican-wireless"|"power-shades"|"rachio"|"rebrandly"|"relay"|"rtsp"|"salto"|"salto-irn"|"samsung"|"se"|"sendgrid"|"sonifi"|"stay-n-touch"|"storable"|"twilio"|"unifi"|"valcom"|"vivotek"|"vizio"|"wisenet"|"cloudflare-images"|"cloudflare-stream"|"insperia-privacy")} [driver] - Driver used to communicate with the object.
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
 * @property {{id?: any, type: ("driversLicense"|"passport"|"identityCard"|"visa"), number?: string, maskedNumber?: string, encryptedNumber?: string, issued?: (string|object), expires?: (string|object), verified?: boolean, matched?: boolean, firstName?: string, lastName?: string, issuingCountry?: string, systemId?: any}[]} [identifications]
 * @property {{id?: any, type: ("amex"|"visa"|"masterCard"|"maestro"|"discover"|"diners"|"jcb"|"applePay"|"alipay"|"chinaUnionPay"|"vpay"), enabled?: boolean, storageData?: string, maskedNumber: string, issued?: string, expires: string, systemId?: any}[]} [payments]
 * @property {{id?: string, name?: string, date?: string, price?: number, tax?: number}[]} [revenue]
 * @property {(string|object)} [createdAt]
 * @property {(string|object)} [updatedAt]
 * @property {string} [systemId] - Identifier of the object, directly related to the system.
 */

/**
 * A system user is a user that originated from an external 3rd party system.
 * @class SystemUser
 * @extends {Entity}
 */
export class SystemUser extends Entity {
  /**
   * @constructor
   * @param {SystemUserData} data - The data to initialize the SystemUser with
   */
  constructor(data) {
    super(data);
    this.id = data.id;
    if (data.type !== undefined) this.type = data.type;
    if (data.driver !== undefined) this.driver = data.driver;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    if (data.phone !== undefined) this.phone = data.phone;
    if (data.email !== undefined) this.email = data.email;
    if (data.address !== undefined) this.address = data.address;
    if (data.photo !== undefined) this.photo = data.photo;
    if (data.jobTitle !== undefined) this.jobTitle = data.jobTitle;
    if (data.dob !== undefined) this.dob = data.dob;
    if (data.gender !== undefined) this.gender = data.gender;
    if (data.roles !== undefined) this.roles = data.roles;
    if (data.nationality !== undefined) this.nationality = data.nationality;
    if (data.notes !== undefined) this.notes = data.notes;
    if (data.files !== undefined) this.files = data.files;
    if (data.identifications !== undefined)
      this.identifications = data.identifications;
    if (data.payments !== undefined) this.payments = data.payments;
    if (data.revenue !== undefined) this.revenue = data.revenue;
    if (data.createdAt !== undefined) this.createdAt = data.createdAt;
    if (data.updatedAt !== undefined) this.updatedAt = data.updatedAt;
    if (data.systemId !== undefined) this.systemId = data.systemId;
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
    required: ["id", "firstName", "lastName"],
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
