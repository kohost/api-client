import { type Definitions } from "./definitions.json";

const discriminatorEnum = [
  "verificationCode",
  "token",
  "mobileKey",
  "pin",
  "publicKey",
  "passkeyChallenge",
] as const;
export const schema = {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "credential.json",
  title: "Credential",
  type: "object",
  required: ["type", "credential", "expires"],
  properties: {
    id: {
      $ref: "definitions.json#/definitions/id",
    },
    type: {
      $ref: "definitions.json#/definitions/type",
      default: "credential",
    },
    driver: {
      $ref: "definitions.json#/definitions/driver",
    },
    discriminator: {
      type: "string",
      enum: discriminatorEnum,
    },
    credential: {
      type: "string",
    },
    user: {
      type: "string",
    },
    organization: {
      type: "string",
    },
    property: {
      type: "string",
    },
    deviceId: {
      type: "string",
    },
    userAgent: {
      type: "string",
    },
    expires: {
      type: ["string", "object", "null"],
    },
    systemId: {
      $ref: "definitions.json#/definitions/systemId",
    },
  },
} as const;

type CredentialDiscriminator = (typeof discriminatorEnum)[number];

export interface CredentialSchema {
  id: Definitions["id"];
  type: "credential";
  driver?: Definitions["driver"];
  discriminator: CredentialDiscriminator;
  credential: string;
  user?: string;
  organization?: string;
  property?: string;
  deviceId?: string;
  userAgent?: string;
  expires: string | null;
  systemId?: Definitions["systemId"];
}
