import { type Definitions } from "./definitions.json";
import { type MediaFileSchema } from "./mediaFile.json";
import { type IdentificationSchema } from "./identification.json";
import { type PaymentSchema } from "./payment.json";

const userRoles = [
  "Guest",
  "User",
  "Manager",
  "Administrator",
  "SuperAdmin",
] as const;

const genders = ["male", "female"] as const;

export const schema = {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "systemUser.json",
  title: "System User",
  description:
    "A system user is a user that originated from an external 3rd party system.",
  type: "object",
  required: ["firstName", "lastName", "driver"],
  properties: {
    id: {
      $ref: "definitions.json#/definitions/id",
    },
    type: {
      type: "string",
      default: "systemUser",
    },
    driver: {
      $ref: "definitions.json#/definitions/driver",
    },
    firstName: {
      type: "string",
    },
    lastName: {
      type: "string",
    },
    phone: {
      type: ["string", "null"],
      pattern: "^\\+[0-9]{1,14}$",
    },
    email: {
      type: ["string", "null"],
      format: "email",
    },
    address: {
      $ref: "definitions.json#/definitions/address",
    },
    photo: {
      type: "string",
    },
    jobTitle: {
      type: "string",
    },
    dob: {
      type: "string",
    },
    gender: {
      type: "string",
      enum: genders,
    },
    roles: {
      type: "array",
      items: {
        type: "string",
        enum: userRoles,
      },
    },
    nationality: {
      type: "string",
      minLength: 2,
      maxLength: 2,
    },
    notes: {
      type: "array",
      items: {
        type: "string",
      },
    },
    files: {
      type: "array",
      items: {
        $ref: "mediaFile.json#",
      },
    },
    identifications: {
      type: "array",
      items: {
        $ref: "identification.json#",
      },
    },
    payments: {
      type: "array",
      items: {
        $ref: "payment.json#",
      },
    },
    revenue: {
      $ref: "definitions.json#/definitions/revenue",
    },
    createdAt: {
      $ref: "definitions.json#/definitions/createdAt",
    },
    updatedAt: {
      $ref: "definitions.json#/definitions/updatedAt",
    },
    systemId: {
      $ref: "definitions.json#/definitions/systemId",
    },
  },
} as const;

type UserRoles = (typeof userRoles)[number];
type Genders = (typeof genders)[number];

export interface SystemUserSchema {
  id: Definitions["id"];
  type: "systemUser";
  driver: Definitions["driver"];
  firstName: string;
  lastName: string;
  phone?: string | null;
  email?: string | null;
  address?: Definitions["address"];
  photo?: string;
  jobTitle?: string;
  dob?: string;
  gender?: Genders;
  roles?: UserRoles[];
  nationality?: string;
  notes?: string[];
  files?: MediaFileSchema[];
  identifications?: IdentificationSchema[];
  payments?: PaymentSchema[];
  revenue?: Definitions["revenue"];
  createdAt?: Definitions["date"];
  updatedAt?: Definitions["date"];
  systemId?: Definitions["systemId"];
}
