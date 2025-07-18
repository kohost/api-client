/* @ts-nocheck */
/* This file is automatically generated. Do not modify it manually. */

import { Entity } from "./entity";
import { validateCredential as validate } from "../validate";

/**
 * @typedef {Object} CredentialData
 * @property {string} [id] - Identifier of the object.
 * @property {string} type - Default: "credential"
 * @property {("adlink"|"aws-kinesis"|"bacnet"|"benq"|"butler"|"comelit"|"crestron"|"dell"|"digital-watchdog"|"distech"|"dmp"|"doorbird"|"dormakaba"|"dsc"|"ecobee"|"epson"|"geovision-rs"|"geovision-as-manager"|"honeywell-vista"|"igor"|"inncom"|"isapi"|"kohost-k7"|"kohost"|"lg"|"lg-webos"|"lapi"|"lirc"|"mews"|"mht"|"newline"|"paxton"|"pelican-wireless"|"power-shades"|"rachio"|"rebrandly"|"relay"|"rtsp"|"salto"|"salto-irn"|"samsung"|"se"|"sendgrid"|"smartboard"|"sonifi"|"stay-n-touch"|"storable"|"twilio"|"unifi"|"valcom"|"vivotek"|"vizio"|"wisenet"|"cloudflare-images"|"cloudflare-stream"|"insperia-privacy")} [driver] - Driver used to communicate with the object.
 * @property {("verificationCode"|"token"|"mobileKey"|"pin"|"publicKey"|"passkeyChallenge")} [discriminator]
 * @property {string} credential
 * @property {string} [userId]
 * @property {string} [organizationId]
 * @property {string} [propertyId]
 * @property {string} [deviceId]
 * @property {string} [userAgent]
 * @property {(string|object)} expires
 * @property {string} [systemId] - Identifier of the object, directly related to the system.
 */

/**
 *
 * @class Credential
 * @extends {Entity}
 */
export class Credential extends Entity {
  /**
   * @constructor
   * @param {CredentialData} data - The data to initialize the Credential with
   */
  constructor(data) {
    super(data);
    if (data.id !== undefined) this.id = data.id;
    this.type = data.type;
    if (data.driver !== undefined) this.driver = data.driver;
    if (data.discriminator !== undefined)
      this.discriminator = data.discriminator;
    this.credential = data.credential;
    if (data.userId !== undefined) this.userId = data.userId;
    if (data.organizationId !== undefined)
      this.organizationId = data.organizationId;
    if (data.propertyId !== undefined) this.propertyId = data.propertyId;
    if (data.deviceId !== undefined) this.deviceId = data.deviceId;
    if (data.userAgent !== undefined) this.userAgent = data.userAgent;
    this.expires = data.expires;
    if (data.systemId !== undefined) this.systemId = data.systemId;
  }
}

Object.defineProperty(Credential.prototype, "schema", {
  value: {
    $schema: "http://json-schema.org/draft-07/schema",
    $id: "credential.json",
    title: "Credential",
    type: "object",
    required: ["type", "credential", "expires"],
    properties: {
      id: { $ref: "definitions.json#/definitions/id" },
      type: { type: "string", default: "credential" },
      driver: { $ref: "definitions.json#/definitions/driver" },
      discriminator: {
        type: "string",
        enum: [
          "verificationCode",
          "token",
          "mobileKey",
          "pin",
          "publicKey",
          "passkeyChallenge",
        ],
      },
      credential: { type: "string" },
      userId: { type: "string" },
      organizationId: { type: "string" },
      propertyId: { type: "string" },
      deviceId: { type: "string" },
      userAgent: { type: "string" },
      expires: { type: ["string", "object", "null"] },
      systemId: { $ref: "definitions.json#/definitions/systemId" },
    },
  },
});

Object.defineProperty(Credential.prototype, "validator", {
  get: function () {
    return validate;
  },
});
