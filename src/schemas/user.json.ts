import { type ReservationSchema } from "./reservation.json";
import { type PaymentSchema } from "./payment.json";
import { type IdentificationSchema } from "./identification.json";
import { type MediaFileSchema } from "./mediaFile.json";
import { type Definitions } from "./definitions.json";

const customPermissions = [
  "RoomControl.spaces",
  "Concierge.timeTracking",
] as const;

const genders = ["male", "female"] as const;

export const schema = {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "user.json",
  title: "User",
  type: "object",
  required: ["firstName", "lastName"],
  properties: {
    id: {
      $ref: "definitions.json#/definitions/id",
    },
    type: {
      type: "string",
      default: "user",
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
    phoneVerified: {
      type: "boolean",
    },
    email: {
      type: ["string", "null"],
      format: "email",
    },
    emailVerified: {
      type: "boolean",
    },
    address: {
      $ref: "definitions.json#/definitions/address",
    },
    secretKey: {
      type: "string",
    },
    photo: {
      $ref: "mediaFile.json",
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

    nationality: {
      type: "string",
      minLength: 2,
      maxLength: 2,
    },
    permissions: {
      type: "array",
      default: [],
      items: {
        type: "object",
        required: ["organization", "property", "role"],
        properties: {
          organization: {
            type: "string",
            description:
              "The ID of the organization the permission is applies to.",
          },
          property: {
            type: "string",
            description: "The ID of the property the permission is applies to.",
          },
          role: {
            $ref: "definitions.json#/definitions/userRole",
          },
          customPermissions: {
            type: "array",
            items: {
              type: "object",
              properties: {
                discriminator: {
                  type: "string",
                  enum: customPermissions,
                },
                onlyIncludeIds: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
        additionalProperties: false,
      },
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
    location: {
      type: "object",
      required: ["accuracy", "latitude", "longitude", "timestamp"],
      additionalProperties: false,
      properties: {
        accuracy: {
          type: ["number", "null"],
        },
        latitude: {
          type: ["number", "null"],
        },
        longitude: {
          type: ["number", "null"],
        },
        timestamp: {
          type: ["number", "null"],
        },
      },
    },
    reservations: {
      type: "array",
      items: {
        $ref: "reservation.json",
      },
    },
    spaceName: {
      type: "string",
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
    systems: {
      type: "array",
      default: [],
      items: {
        type: "object",
        properties: {
          systemId: {
            type: "string",
          },
          property: {
            type: "string",
          },
          driver: {
            $ref: "definitions.json#/definitions/driver",
          },
        },
        required: ["systemId", "property", "driver"],
        additionalProperties: false,
      },
    },
  },
} as const;

type CustomPermissionsOptions = (typeof customPermissions)[number];
type GenderOptions = (typeof genders)[number];

export interface UserPermissionSchema {
  organization: string;
  property: string;
  role: Definitions["userRole"];
  customPermissions?: {
    discriminator: CustomPermissionsOptions;
    onlyIncludeIds?: string[];
  }[];
}

export interface UserSystemSchema {
  systemId: string;
  property: string;
  driver: Definitions["driver"];
}

export interface UserLocationSchema {
  accuracy: number | null;
  latitude: number | null;
  longitude: number | null;
  timestamp: number | null;
}

export interface UserSchema {
  id: Definitions["id"];
  type: "user";
  firstName?: string;
  lastName: string;
  phone?: string | null;
  phoneVerified?: boolean;
  email?: string | null;
  emailVerified?: boolean;
  address?: Definitions["address"];
  secretKey?: string;
  photo?: MediaFileSchema;
  jobTitle?: string;
  dob?: string;
  gender?: GenderOptions;
  nationality?: string;
  permissions?: UserPermissionSchema[];
  notes?: string[];
  files?: MediaFileSchema[];
  identifications?: IdentificationSchema[];
  payments?: PaymentSchema[];
  location?: UserLocationSchema;
  reservations?: ReservationSchema[];
  spaceName?: string;
  revenue?: Definitions["revenue"];
  createdAt?: Definitions["createdAt"];
  updatedAt?: Definitions["updatedAt"];
  systems?: UserSystemSchema[];
}
