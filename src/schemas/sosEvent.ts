import defs, { ISODateString } from "./definitions";
import type { FromSchema } from "json-schema-to-ts";

// Sub-node consts must not be exported: the model generator treats the first
// export ending in "Schema" as the entity schema.
const sosActorNode = {
  type: ["object", "null"],
  additionalProperties: false,
  required: ["id", "discriminator"],
  properties: {
    id: { type: "string" },
    discriminator: {
      type: "string",
      enum: ["user", "device", "automation"],
    },
  },
} as const;

// Live outcome rollup for one channel. Buckets map the raw vendor statuses:
// `sent` = accepted/in-flight but not yet terminal, `delivered` = terminal
// success (delivered/read/opened/clicked), `failed` = terminal failure
// (failed/undelivered/bounced/blocked). See deliveryOutcomeForStatus.
const deliveryOutcomeNode = {
  type: "object",
  additionalProperties: false,
  required: ["sent", "delivered", "failed"],
  properties: {
    sent: { type: "integer", minimum: 0 },
    delivered: { type: "integer", minimum: 0 },
    failed: { type: "integer", minimum: 0 },
  },
} as const;

const audienceDeliveryNode = {
  type: "object",
  additionalProperties: false,
  description: "Per-channel live outcomes for one audience.",
  properties: {
    sms: deliveryOutcomeNode,
    email: deliveryOutcomeNode,
  },
} as const;

// A timeline entry is a discriminated union on `type`, so `timeline.items` is
// their `oneOf`. The branches are disjoint via the `type` enum plus
// `additionalProperties: false`, so an entry validates against exactly one.
const broadcastEntryNode = {
  type: "object",
  additionalProperties: false,
  required: ["id", "type", "message", "by", "at", "audience"],
  properties: {
    id: {
      type: "string",
      description: "Unique identifier for the timeline entry.",
    },
    type: {
      type: "string",
      enum: ["activation", "update", "final"],
      description:
        "`activation` opens the event, `update` is an interim message, `final` closes it.",
    },
    message: {
      type: "string",
      description:
        "The entry's message body. May be empty for entries that carry only audience/delivery intent.",
    },
    by: {
      ...sosActorNode,
      description: "Actor that authored the entry; null when unattributed.",
    },
    at: {
      $ref: "definitions.json#/definitions/date",
      description: "When the entry was recorded.",
    },
    audience: {
      $ref: "definitions.json#/definitions/audience",
      description:
        "Who this entry was directed at, and who it resolved to. `activation` entries always carry the everyone wildcard; `update` and `final` entries carry whatever the sender named — an empty selector reaches nobody.",
    },
    channels: {
      type: "array",
      items: { type: "string", enum: ["sms", "email"] },
      description:
        "Personal channels the sender selected for this entry. Absent on entries recorded before channel selection existed, which sent over both.",
    },
    surfaces: {
      type: "object",
      additionalProperties: false,
      required: ["targets", "sent", "failed", "skipped"],
      description:
        "Rollup of the PA-surface dispatch, present when the entry named surfaces. `targets` is the devices the selectors resolved to; `skipped` counts drivers that cannot render content.",
      properties: {
        targets: { type: "integer", minimum: 0 },
        sent: { type: "integer", minimum: 0 },
        failed: { type: "integer", minimum: 0 },
        skipped: { type: "integer", minimum: 0 },
      },
    },
    deliveryStatus: {
      type: "object",
      additionalProperties: false,
      description:
        "Computed on demand by DescribeSOSEvent (not persisted): live per-audience, per-channel outcome counts grouped from the sms/email collections by appData.sosUpdateId × status. Absent on the returned event until at least one matching message exists; only audiences/channels with data are present.",
      properties: {
        internal: audienceDeliveryNode,
        external: audienceDeliveryNode,
      },
    },
  },
} as const;

const automationRunActionNode = {
  type: "object",
  additionalProperties: false,
  required: ["type", "status"],
  properties: {
    type: {
      type: "string",
      description: "The use case the automation action invoked.",
    },
    status: {
      type: "string",
      enum: ["pending", "success", "failure"],
      description:
        "`pending` while the action is in flight; settles to `success` or `failure`.",
    },
    error: {
      type: ["string", "null"],
      description: "Failure message; absent when the action succeeded.",
    },
    params: {
      type: "object",
      description:
        "Pruned snapshot of the action's configured params (e.g. SetDevices device states, StartSOS type ids), enough to render a human summary of what the action did. Absent when the use case has no summarizable params.",
    },
  },
} as const;

const automationRunEntryNode = {
  type: "object",
  additionalProperties: false,
  required: [
    "id",
    "type",
    "at",
    "by",
    "automationName",
    "runId",
    "trigger",
    "actions",
  ],
  properties: {
    id: {
      type: "string",
      description: "Unique identifier for the timeline entry.",
    },
    type: {
      type: "string",
      enum: ["automationRun"],
      description:
        "Discriminator: an automation that ran in response to this SOS.",
    },
    at: {
      $ref: "definitions.json#/definitions/date",
      description:
        "When the run started. The entry is stamped with pending actions up front and settled in place.",
    },
    by: {
      type: "object",
      additionalProperties: false,
      required: ["id", "discriminator"],
      description:
        "The Automation that ran. Its id is the automation's id — there is no separate automationId.",
      properties: {
        id: { type: "string" },
        discriminator: { type: "string", enum: ["automation"] },
      },
    },
    automationName: {
      type: "string",
      description:
        "The automation's name snapshotted at run time, so a later rename or delete leaves the timeline readable.",
    },
    runId: {
      type: "string",
      description:
        "Groups this run's Activity records; one event matching several automations yields one runId each.",
    },
    trigger: {
      type: "string",
      enum: ["SOSActive", "SOSInactive"],
      description: "The SOS event type that matched the automation's trigger.",
    },
    actions: {
      type: "array",
      default: [],
      description: "Per-action outcome, in the automation's action order.",
      items: automationRunActionNode,
    },
  },
} as const;

const noteNode = {
  type: "object",
  additionalProperties: false,
  required: ["id", "text", "by", "at"],
  properties: {
    id: {
      type: "string",
      description: "Unique identifier for the note.",
    },
    text: {
      type: "string",
      description: "Internal, plain-text note body. Never broadcast.",
    },
    by: {
      ...sosActorNode,
      description: "Actor that wrote the note; null when unattributed.",
    },
    at: {
      $ref: "definitions.json#/definitions/date",
      description: "When the note was recorded.",
    },
  },
} as const;

export const sosEventSchema = {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "sosEvent.json",
  title: "SOS Event",
  description:
    "A durable record of a single SOS activation on a Property, with an append-only timeline of updates. Persists as audit history after the SOS is cleared.",
  type: "object",
  required: ["id", "type", "sosTypeIds", "activatedAt", "timeline"],
  additionalProperties: false,
  properties: {
    id: {
      $ref: "definitions.json#/definitions/id",
      description: "Unique identifier for the SOS Event.",
    },
    type: {
      type: "string",
      enum: ["sosEvent"],
      default: "sosEvent",
    },
    propertyId: {
      type: "string",
      description:
        "ID of the Property this SOS was raised on. Used as a per-document filter inside the org-scoped database.",
    },
    sosTypeIds: {
      type: "array",
      items: { type: "string" },
      description: "The SOS Type ids this event was raised for.",
    },
    activatedAt: {
      $ref: "definitions.json#/definitions/date",
      description: "When the SOS was raised.",
    },
    activatedBy: {
      ...sosActorNode,
      description:
        "Actor that raised the SOS (user, device, or automation); null when unattributed.",
    },
    deactivatedAt: {
      $ref: "definitions.json#/definitions/date",
      description:
        "When the SOS was cleared. Absent while the event is active.",
    },
    deactivatedBy: {
      ...sosActorNode,
      description:
        "Actor that cleared the SOS; null when unattributed. Absent while the event is active.",
    },
    timeline: {
      type: "array",
      default: [],
      description:
        "Append-only timeline. The first entry is the `activation`; later entries are operator `update`s, automation runs, and a closing `final`.",
      items: {
        oneOf: [broadcastEntryNode, automationRunEntryNode],
      },
    },
    notes: {
      type: "array",
      default: [],
      description:
        "Append-only, internal-only post-incident notes. Kept outside the timeline: a note is for the record, never something that was broadcast.",
      items: noteNode,
    },
    report: {
      type: "object",
      additionalProperties: false,
      required: ["fileId", "url", "filename", "contentHash", "renderedAt"],
      description:
        "The most recently minted incident-report PDF, kept so a re-export of an unchanged, ended incident can reuse the file instead of rendering again. `contentHash` fingerprints the rendered content (excluding the generated-at stamp).",
      properties: {
        fileId: { type: "string" },
        url: { type: "string" },
        filename: { type: "string" },
        contentHash: { type: "string" },
        renderedAt: { $ref: "definitions.json#/definitions/date" },
      },
    },
    createdAt: {
      $ref: "definitions.json#/definitions/date",
      description: "When the SOS Event was created.",
    },
    updatedAt: {
      $ref: "definitions.json#/definitions/date",
      description: "When the SOS Event was last modified.",
    },
    deletedAt: {
      type: ["string", "object", "null"],
      format: "date-time",
      description: "Soft-delete tombstone.",
    },
  },
} as const;

export type SOSEventSchema = FromSchema<
  typeof sosEventSchema,
  {
    references: [typeof defs];
    // `notes` carries `default: []` but is not required; keep it optional in
    // the type so pre-notes documents and writers that omit it still fit.
    keepDefaultedPropertiesOptional: true;
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
