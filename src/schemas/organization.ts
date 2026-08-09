import defs, { ISODateString } from "./definitions";
import type { FromSchema } from "json-schema-to-ts";

export const organizationSchema = {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "organization.json",
  title: "Organization",
  type: "object",
  description:
    "An organization is a group or entity that subscribes to Kohost software.",
  required: ["id", "type", "accountNumber", "name"],
  additionalProperties: false,
  properties: {
    id: {
      $ref: "definitions.json#/definitions/id",
    },
    type: {
      type: "string",
      default: "organization",
      enum: ["organization"],
    },
    accountNumber: {
      type: ["number", "null"],
    },
    name: {
      type: "string",
    },
    // Widening this enum requires a minor-units exponent table first:
    // parseMoneyToCents and centsToInput both assume 2 decimal places.
    currency: {
      type: "string",
      enum: ["USD"],
      default: "USD",
      description:
        "ISO 4217 currency code for all of the organization's money amounts. USD only in v1.",
    },
    smsNumber: {
      type: "string",
    },
    properties: {
      type: "array",
      items: {
        type: "string",
      },
    },
    appManifest: {
      type: "object",

      properties: {
        name: {
          type: "string",
        },
        short_name: {
          type: "string",
        },
        scope: {
          type: "string",
        },
        start_url: {
          type: "string",
        },
        themeColor: {
          type: "string",
        },
        backgroundColor: {
          type: "string",
        },
        display: {
          type: "string",
          enum: ["fullscreen", "standalone", "minimal-ui", "browser"],
          default: "fullscreen",
        },
        orientation: {
          type: "string",
          enum: ["portrait", "landscape"],
          default: "portrait",
        },
        splash: {
          type: "object",
          properties: {
            src: {
              type: "string",
            },
            type: {
              type: "string",
            },
            sizes: {
              type: "string",
            },
          },
        },
        icons: {
          type: "array",
          items: {
            type: "object",
            properties: {
              src: {
                type: "string",
              },
              sizes: {
                type: "string",
              },
              type: {
                type: "string",
              },
            },
          },
        },
        logo: {
          type: "object",
          properties: {
            src: {
              type: "string",
            },
            type: {
              type: "string",
            },
            sizes: {
              type: "string",
            },
          },
        },
      },
      default: {
        name: "Kohost",
        short_name: "Kohost",
        start_url: "/",
        scope: "/",
        display: "fullscreen",
        orientation: "portrait",
        theme_color: "#1d1f22",
        background_color: "#1d1f22",
        icons: [
          {
            src: "https://images.kohost.io/cdn-cgi/imagedelivery/vcVX2aBwdFSYr66spcFKaA/9c85047f-ccba-4b1c-3070-5463fbe93b00/w=512",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        splash: {
          src: "https://images.kohost.io/cdn-cgi/imagedelivery/vcVX2aBwdFSYr66spcFKaA/034fb112-5326-4d37-373e-d1cc2a4d0400/w=1500",
          sizes: "1500x800",
          type: "image/jpg",
        },
        logo: {
          src: "https://images.kohost.io/cdn-cgi/imagedelivery/vcVX2aBwdFSYr66spcFKaA/1e54c54d-3bac-4745-f46f-c2f98036af00/h=75",
          sizes: "300x75",
          type: "image/png",
        },
      },
    },
    features: {
      type: "object",
      additionalProperties: false,
      properties: {
        Concierge: {
          type: "object",
          additionalProperties: false,
          properties: {
            tickets: {
              type: "object",
              properties: {
                nextTicketNumber: {
                  type: ["string", "integer"],
                  default: 1,
                },
                autoCloseAfterMinutes: {
                  type: "integer",
                  description:
                    "Minutes a solved Ticket waits before it is automatically closed. Always on; read when the close job is scheduled.",
                  default: 10080,
                  minimum: 5,
                },
                notifications: {
                  type: "array",
                  description:
                    "Org-wide ticket notification defaults: the starting channel set per event, and whether members may turn an event off. Read when resolving a member's effective channels.",
                  items: {
                    type: "object",
                    additionalProperties: false,
                    required: ["discriminator", "channels", "locked"],
                    properties: {
                      discriminator: {
                        $ref: "definitions.json#/definitions/ticketNotificationEvent",
                      },
                      channels: {
                        type: "array",
                        items: {
                          $ref: "definitions.json#/definitions/notificationChannel",
                        },
                      },
                      locked: {
                        type: "boolean",
                      },
                    },
                  },
                },
              },
            },
            departments: {
              type: "object",
              additionalProperties: false,
              properties: {
                order: {
                  type: "array",
                  description:
                    "Org-wide curated Department ID order for the Concierge settings UI. The `Unassigned` and `System` pseudo-groups are pinned at the bottom by the UI and have no entries here.",
                  items: {
                    type: "string",
                  },
                },
              },
            },
            issues: {
              type: "object",
              additionalProperties: false,
              properties: {
                order: {
                  type: "object",
                  description:
                    "Org-wide curated Issue ordering for the Concierge settings UI, mapping each Department ID to its ordered Issue IDs.",
                  additionalProperties: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                },
              },
            },
            facilities: {
              type: "object",
              additionalProperties: false,
              properties: {
                enabled: {
                  type: "boolean",
                  default: false,
                },
                agentUserId: {
                  type: ["string", "null"],
                  default: null,
                },
              },
            },
            approvals: {
              type: "object",
              additionalProperties: false,
              properties: {
                dneAmount: {
                  type: ["integer", "null"],
                  minimum: 0,
                  default: null,
                  description:
                    "Do-not-exceed amount in integer cents. Tickets whose marked-up estimate total exceeds it require approval; null or unset means the gate is off.",
                },
                approverUserIds: {
                  type: "array",
                  default: [],
                  description:
                    "Org users asked to approve when the gate trips; the effective set freezes onto each approval record at request time.",
                  items: {
                    type: "string",
                  },
                },
              },
            },
            costs: {
              type: "object",
              additionalProperties: false,
              properties: {
                markupTiers: {
                  type: "array",
                  default: [],
                  lowerBoundTable: { key: "minAmount" },
                  description:
                    "Lower-bound markup rows keyed per cost entry by its vendor-cost estimate: first row minAmount 0, minAmounts strictly ascending, so gaps and overlaps are impossible. No property override; visible to roster agents and superadmins only, never to org-side viewers.",
                  items: {
                    type: "object",
                    additionalProperties: false,
                    required: ["minAmount", "percent"],
                    properties: {
                      minAmount: {
                        type: "integer",
                        minimum: 0,
                        description:
                          "Inclusive lower bound of the tier in integer cents.",
                      },
                      percent: {
                        type: "number",
                        minimum: 0,
                        description: "Markup percent for the tier, uncapped.",
                      },
                    },
                  },
                },
              },
            },
          },
        },
        SOS: {
          type: "object",
          additionalProperties: false,
          properties: {
            types: {
              type: "object",
              additionalProperties: false,
              properties: {
                order: {
                  type: "array",
                  description:
                    "Org-wide curated SOS Type ID order. Each Property renders its subset of " +
                    "SOS Types in this order; org-wide and per-property-selected types share one " +
                    "order. IDs for deleted SOS Types are ignored on read; SOS Types not yet listed " +
                    "sort to the end alphabetically.",
                  items: { type: "string" },
                },
              },
            },
          },
        },
      },
    },
    credentials: {
      type: "object",
      additionalProperties: true,
      properties: {
        webhookToken: { type: "string" },
      },
    },
    taxExempt: {
      type: "boolean",
      default: false,
      description:
        "Whether OneBill bills to this organization carry no tax. Kohost " +
        "staff-edited; a draft bill live-reads it and snapshots it at " +
        "mark-sent.",
    },
    billingAddress: {
      $ref: "definitions.json#/definitions/address",
      description:
        "Postal address printed on OneBill bills. Org administrators edit it; " +
        "a bill live-reads it while draft and snapshots it at mark-sent, which " +
        "requires line1, city, state, and postalCode to be non-empty.",
    },
    billingContacts: {
      type: "array",
      description:
        "Recipients of the bill-sent email. KFC-edited only; plain name/email " +
        "pairs, recipients need not be platform users. Mark-sent requires at " +
        "least one contact.",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["name", "email"],
        properties: {
          name: {
            type: "string",
            minLength: 1,
          },
          email: {
            type: "string",
            format: "email",
          },
        },
      },
    },
    createdAt: {
      $ref: "definitions.json#/definitions/date",
    },
    updatedAt: {
      $ref: "definitions.json#/definitions/date",
    },
    deletedAt: {
      $ref: "definitions.json#/definitions/date",
    },
  },
} as const;

export type OrganizationSchema = FromSchema<
  typeof organizationSchema,
  {
    references: [typeof defs];
    deserialize: [
      {
        pattern: {
          format: "date-time";
        };
        output: Date | ISODateString;
      },
    ];
  }
>;

type ConciergeFeatures = NonNullable<
  NonNullable<OrganizationSchema["features"]>["Concierge"]
>;

type ConciergeTickets = NonNullable<ConciergeFeatures["tickets"]>;

/** Org-level DNE approval gate config: amount plus default approver set. */
export type ConciergeApprovalsConfig = NonNullable<
  ConciergeFeatures["approvals"]
>;

/**
 * The ISO 4217 code every money amount an organization owns is denominated in.
 * USD alone in v1: widening the enum needs a minor-units exponent table first.
 */
export type Currency = NonNullable<OrganizationSchema["currency"]>;

/** One lower-bound markup tier row. */
export type MarkupTier = NonNullable<
  NonNullable<ConciergeFeatures["costs"]>["markupTiers"]
>[number];

/** One OneBill billing contact: a plain name/email pair, KFC-edited. */
export type OrganizationBillingContact = NonNullable<
  OrganizationSchema["billingContacts"]
>[number];

/** One org-wide ticket notification default: channels + lock for a single event. */
export type OrgNotificationDefaultEntry = NonNullable<
  ConciergeTickets["notifications"]
>[number];

/** Response envelope for the org notification defaults endpoints. */
export interface OrgNotificationDefaults {
  organizationId: string;
  notifications: OrgNotificationDefaultEntry[];
}
