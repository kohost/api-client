import defs, { ISODateString } from "./definitions";
import type { FromSchema } from "json-schema-to-ts";

export const announcementSchema = {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "announcement.json",
  title: "Announcement",
  description: "Announcement message sent to users",
  type: "object",
  required: ["id", "type"],
  properties: {
    id: { $ref: "definitions.json#/definitions/id" },
    propertyId: {
      type: "string",
      description:
        "ID of the property this entity belongs to. Optional — used as a per-document filter inside the org-scoped database.",
    },
    type: {
      type: "string",
      enum: ["announcement"],
      default: "announcement",
    },
    status: {
      type: "string",
      description:
        "`sent` is a real broadcast; `preset` is a named, reusable configuration a sender loads into the composer. Absent on records written before presets existed — read as `sent`.",
      enum: ["sent", "preset"],
      default: "sent",
    },
    name: {
      type: "string",
      description: "Display name of a preset. Sent announcements have none.",
    },
    presetId: {
      type: "string",
      description:
        "The preset this sent announcement was loaded from, when it was.",
    },
    audience: {
      $ref: "definitions.json#/definitions/audience",
      description:
        "Who this announcement was directed at on the people axis. PA surfaces are the other axis and never reach the emergency-contact roster.",
    },
    channels: {
      type: "array",
      description: "Personal channels this announcement was sent over.",
      items: {
        type: "string",
        enum: ["sms", "email"],
      },
    },
    subject: {
      type: "string",
      description: "Email subject, and the title shown on a surface.",
    },
    surfaces: {
      type: "array",
      description:
        "Surface channels the announcement was broadcast to, as the sender selected them. `discriminator` is the mediaSource `Device.discriminator` targeted, open for future surface types; only `paSystem` ships today.",
      items: {
        type: "object",
        required: ["discriminator", "scope"],
        properties: {
          discriminator: {
            type: "string",
            enum: ["paSystem"],
          },
          scope: {
            type: "string",
            enum: ["all", "spaces", "devices"],
          },
          spaceIds: {
            type: "array",
            items: { type: "string" },
          },
          deviceIds: {
            type: "array",
            items: { type: "string" },
          },
          outputs: {
            type: "array",
            description: "PA output zones to page; all zones when omitted.",
            items: { type: "string" },
          },
          playlistId: {
            type: "string",
            description:
              "A PA playlist (driver recording) played in place of the spoken body; its zones are the playlist's own.",
          },
        },
        additionalProperties: false,
      },
    },
    body: {
      type: "string",
      description:
        "The spoken/written message. Optional only when every surface plays a preset and no channel is selected.",
    },
    media: {
      $ref: "mediaFile.json",
    },
    sentBy: {
      type: "string",
    },
    result: {
      type: "object",
      additionalProperties: false,
      required: ["recipientsResolved", "perChannel", "skipped", "surfaces"],
      description:
        "What the send actually achieved, written once at send time and never recomputed. Absent on presets and on sends recorded before this was stored. The `audience.delivery` counts are the same send viewed per audience; this is the per-channel and per-device detail behind them.",
      properties: {
        recipientsResolved: {
          type: "integer",
          minimum: 0,
          description:
            "How many internal Users the audience selector resolved to. Zero when no personal channel was selected, however wide the selector — an announcement with no channel reaches no User.",
        },
        external: {
          type: "object",
          additionalProperties: false,
          required: ["recipients", "delivery"],
          description:
            "The external SIS roster this send reached. Absent when no external group was named.",
          properties: {
            recipients: {
              type: "integer",
              minimum: 0,
              description: "Size of the roster the named groups resolved to.",
            },
            delivery: {
              type: "object",
              additionalProperties: false,
              description:
                "Per-channel counts, present only for the channels attempted.",
              properties: {
                sms: { $ref: "definitions.json#/definitions/deliveryCounts" },
                email: { $ref: "definitions.json#/definitions/deliveryCounts" },
              },
            },
          },
        },
        perChannel: {
          type: "object",
          additionalProperties: false,
          required: ["sms", "email"],
          description:
            "Messages handed to each personal channel; zero for a channel the send did not select.",
          properties: {
            sms: { type: "integer" },
            email: { type: "integer" },
          },
        },
        skipped: {
          type: "array",
          description:
            "Recipients a selected channel could not carry the announcement to. A missing contact detail is a per-channel skip, not a failed send, so one recipient may appear once per channel.",
          items: {
            type: "object",
            required: ["userId", "channel", "reason"],
            additionalProperties: false,
            properties: {
              userId: { type: "string" },
              channel: { type: "string", enum: ["sms", "email"] },
              reason: { type: "string", enum: ["no-phone", "no-email"] },
            },
          },
        },
        surfaces: {
          type: "array",
          description:
            "Per-device outcome of the surface page, one entry per device the selectors resolved to. Distinct from the top-level `surfaces`, which is the selector the sender expressed.",
          items: {
            type: "object",
            required: ["deviceId", "status"],
            additionalProperties: false,
            properties: {
              deviceId: { type: "string" },
              status: {
                type: "string",
                enum: ["sent", "failed", "skipped"],
              },
              reason: {
                type: "string",
                description:
                  '`unsupported` when the driver advertises no content command; absent otherwise.',
              },
            },
          },
        },
      },
    },
    tags: {
      type: "array",
      items: {
        type: "string",
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
  additionalProperties: false,
} as const;

export type AnnouncementSchema = FromSchema<
  typeof announcementSchema,
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
