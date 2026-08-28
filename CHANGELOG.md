# @kohost/api-client

## 7.11.0

### Minor Changes

- [#795](https://github.com/kohost/kohost/pull/795) [`6b80e0c`](https://github.com/kohost/kohost/commit/6b80e0c418c2e175f567e4a404e2d7a1d5570532) Thanks [@itrogers](https://github.com/itrogers)! - Ticket and concierge stats now use a per-metric basis under the single `from`/`to` range. Opened stats stay on the created date; resolved stats (count, resolution time, resolved-by breakdowns) use the solved date, so work opened before the period but solved inside it is counted. Closed tickets are guaranteed a `solvedAt`: a migration backfills it and normalizes legacy string timestamps. The `solvedFrom`/`solvedTo`, `basis` and `resolvedRange` params are removed. The maximum stats window grows from one year to three. The admin concierge stats breakdown picker drops Location, Department, and Tag.

- [#796](https://github.com/kohost/kohost/pull/796) [`65ba27d`](https://github.com/kohost/kohost/commit/65ba27dd9d2c12e9709f5f1e21008a8d240fd3c3) Thanks [@itrogers](https://github.com/itrogers)! - Ticket costs can be voided; voided costs clear the approval gate and financial completion

### Patch Changes

- [#602](https://github.com/kohost/kohost/pull/602) [`1c764e5`](https://github.com/kohost/kohost/commit/1c764e50891ba07877c9b38ff4329b63ba2418d8) Thanks [@itrogers](https://github.com/itrogers)! - Move the monorepo to Node 24 and npm 12: new Docker base image for the API, Node 24 across CI and the Netlify builds for app and web.

## 7.10.0

### Minor Changes

- [#457](https://github.com/kohost/kohost/pull/457) [`0f47376`](https://github.com/kohost/kohost/commit/0f473761b2f5b882c5b81443e01661c5074ef485) Thanks [@itrogers](https://github.com/itrogers)! - **Announcements.** Send a one-time message from a property to the people and places that need to hear it.

  - Pick who hears it: everyone, specific users, roles, departments, or the school's External Users groups (students and parents from your SIS).
  - Pick how it reaches them: SMS, email, and the PA system — narrowed by space, system, or zone. Play a PA preset instead of, or in addition to, a spoken message.
  - Save a setup as a named preset and reuse it next time. Browse every past send and load one back into the composer.
  - Recipients missing a phone number or email are skipped on that channel instead of blocking the send.

  Announcements is enabled on every property. Administrators can use it immediately; other roles need `feature:Announcements` allowed in a policy.

- [#457](https://github.com/kohost/kohost/pull/457) [`0f47376`](https://github.com/kohost/kohost/commit/0f473761b2f5b882c5b81443e01661c5074ef485) Thanks [@itrogers](https://github.com/itrogers)! - **SOS incident record, updates, and reporting.** Every SOS activation is now a durable incident with a full timeline.

  - **Send updates mid-incident.** Administrators can broadcast an update to staff by SMS, email, and the PA system, or post a log-only note that notifies no one. Opt in students and parents (from the SIS roster) when they need to hear it too.
  - **End with a final message.** Ending an SOS opens a drawer to send an all-clear to the same audiences and channels — or end silently.
  - **See who got it.** Each timeline entry shows live sent/delivered/failed counts per audience and channel, with opt-outs and carrier failures called out.
  - **One email thread per incident.** Every email about an SOS — automation alerts, updates, the all-clear — threads into a single conversation.
  - **Automation runs on the timeline.** Each automation that fired on activation or deactivation appears in the timeline with per-action success or failure.
  - **Post-incident notes.** Add internal, attributed notes to a closed incident.
  - **Incident history report.** Under Reports, browse every past and present incident, filter by date and status, open a read-only view of the full timeline, and export an incident as a PDF.

## 7.9.0

### Minor Changes

- [#718](https://github.com/kohost/kohost/pull/718) [`258ed29`](https://github.com/kohost/kohost/commit/258ed2973601e7679a18f33cdfaf35d4173590a4) Thanks [@itrogers](https://github.com/itrogers)! - Forward-port the additive api-client schemas from the SOS event record branch so master tolerates data written by it, enabling switching between the two deploys. Property gains `SOS.currentEventId` and `Features.Announcements`; `smsMessage`/`emailMessage` gain an optional raw `errorCode`; `systemUser` gains `propertyId`/`syncedAt`; new `sosEvent` entity schema plus shared `audience`/`deliveryCounts` definitions; new lib helpers (`sisDrivers`, `sosAudiences`, `messageErrorCodes`, `deliveryStatus`, `emergencyContacts`); new client use cases (`ListSOSEvents`, `DescribeSOSEvent`, `SendSOSUpdate`, `FetchEmergencyContacts`, `SendAnnouncement`) that are inert until the API ships their routes. The unused legacy `announcement` schema is replaced with the audience/channels/surfaces shape.

- [#714](https://github.com/kohost/kohost/pull/714) [`7664dc5`](https://github.com/kohost/kohost/commit/7664dc593b762fcd6abb08c652d7cd8d100ecc73) Thanks [@itrogers](https://github.com/itrogers)! - Seed KFC defaults at enablement: turning on Facilities Concierge seeds a $1,500 do-not-exceed amount when none is configured and requires at least one approver, and the default markup table becomes 15% dropping to 10% at $3,000

- [#703](https://github.com/kohost/kohost/pull/703) [`8354894`](https://github.com/kohost/kohost/commit/8354894f999a26dd737359e2d979332a810fe6bd) Thanks [@itrogers](https://github.com/itrogers)! - Replace Device: claim a discovered device into an existing Device (keeps id/name/space, overwrites hardware fields, consumes the discovered row) via POST /spaces/:spaceId/devices/:id/replace and a per-row Replace picker in the Devices tab

- [#711](https://github.com/kohost/kohost/pull/711) [`f9c469f`](https://github.com/kohost/kohost/commit/f9c469f7bdb28701a5bd99dbb9445f04f2e72648) Thanks [@itrogers](https://github.com/itrogers)! - Validate a ticket's new issue on reassignment and record the change in the ticket conversation as an `issueChanged` entry

## 7.8.2

### Patch Changes

- [`b4b0ce2`](https://github.com/kohost/kohost/commit/b4b0ce28b8a25594e83f6157e0938f68532281a5) Thanks [@itrogers](https://github.com/itrogers)! - Replace empty-header-deletes-ambient convention with explicit property targeting: cross-org ticket reads now name the ticket's own property id instead of unsetting X-Property-Id

## 7.8.1

### Patch Changes

- [#676](https://github.com/kohost/kohost/pull/676) [`8ec51b5`](https://github.com/kohost/kohost/commit/8ec51b5ae164e86703af1b088f7e0410c7830849) Thanks [@itrogers](https://github.com/itrogers)! - Stop leaking the ambient X-Property-Id into cross-org requests: an empty/nullish per-request header now deletes the client's ambient header, and targeted headers strip the property explicitly when a request names an organization without one, fixing intermittent "Unavailable" tickets in the global concierge workspace.

## 7.8.0

### Minor Changes

- [#398](https://github.com/kohost/kohost/pull/398) [`f176c3b`](https://github.com/kohost/kohost/commit/f176c3b783fda4dc7a3decd4d31b1abcedcf7c58) Thanks [@itrogers](https://github.com/itrogers)! - feat: Concierge stats — internal and org-facing. One canonical Ticket Stats report engine powers two surfaces. The superadmin `/admin/concierge-stats` page reports KFC-wide across every enabled org over a federated Mongo connection: KPI tiles, money metrics (vendor cost, revenue, profit, margin), trend charts with previous-period comparison, a trailing-year heatmap, full breakdown dimensions, URL-carried filters, and a paginated drill-down table with CSV export. Organizations get their own Admin-gated stats page on the concierge surface, computed over their own tickets with spend redacted to the customer price — vendor cost, profit, and margin stay internal-only.

- [#398](https://github.com/kohost/kohost/pull/398) [`f176c3b`](https://github.com/kohost/kohost/commit/f176c3b783fda4dc7a3decd4d31b1abcedcf7c58) Thanks [@itrogers](https://github.com/itrogers)! - feat: unified KFC Concierge Workspace. `/admin/concierge` queues every KFC ticket across organizations with server-side filtering, sorting, and pagination. Two pinned sections track the 15-minute first-reply target and the needs-response backlog, longest-waiting first; a flyout opens any ticket in place under its owning org, and a live needs-response badge rides the nav tile. Reads push sort/limit/count into per-org Mongo queries with bounded fan-out and a cached badge digest.

- [#398](https://github.com/kohost/kohost/pull/398) [`f176c3b`](https://github.com/kohost/kohost/commit/f176c3b783fda4dc7a3decd4d31b1abcedcf7c58) Thanks [@itrogers](https://github.com/itrogers)! - feat: Kohost Facilities Concierge program. Organizations can be enrolled in KFC — per-org and per-property enablement, an assigned facilities agent, and markup tiers, managed from a superadmin card on the org's Concierge Settings and the admin org detail page. Kohost staff gain platform-level Billing and Facilities functions, a branded "Kohost Facilities Concierge" identity across ticket surfaces, and a SuperAdmin-gated `/admin/staff` roster page with staff-account create, edit, and delete. Kohost staff are hidden from customer-org user listings while staying mentionable and notified on tickets. `/admin` is gated by Kohost staff with per-tile authorization.

- [#398](https://github.com/kohost/kohost/pull/398) [`f176c3b`](https://github.com/kohost/kohost/commit/f176c3b783fda4dc7a3decd4d31b1abcedcf7c58) Thanks [@itrogers](https://github.com/itrogers)! - feat: OneBill — cross-org invoicing for Kohost Facilities Concierge. A reconciliation pool federates every KFC org's unbilled ticket costs for inline preparation (billing category, vendor invoice attachments, actual cost, write-off/reinstate), and a composer turns claimed lines into bills with a draft → sent → paid lifecycle, tax with org exemption, shipping & handling, manual and credit lines, and full cost history. Invoice numbers are system-assigned (`KB-…`) at send. Mark-sent mints a PDF via the new `apps/docugen` worker (HTML → PDF over Cloudflare Browser Rendering) and emails every billing contact; the file-store gains a Kohost-staff-only `private` tier for vendor paperwork. A cross-org Invoices ledger sits beside the pool with status, aging callouts, and outstanding/collected totals. Organizations get billing addresses, managed billing contacts, an org-level currency, and an Administrator-gated Invoices section in settings with per-bill detail and PDF download. A one-off importer retires the legacy billing spreadsheet as native bills.

- [#398](https://github.com/kohost/kohost/pull/398) [`f176c3b`](https://github.com/kohost/kohost/commit/f176c3b783fda4dc7a3decd4d31b1abcedcf7c58) Thanks [@itrogers](https://github.com/itrogers)! - feat: platform groundwork. Shared domain rules (money, rich-text projection, stats date windows) hoisted into `@kohost/api-client/lib` as a single implementation for API and app. Lazy use-case loading cuts API boot time. The organization switcher gains an Admin link and immediate selection, home pages gain Reports tiles, and ticket search matches ticket numbers.

- [#398](https://github.com/kohost/kohost/pull/398) [`f176c3b`](https://github.com/kohost/kohost/commit/f176c3b783fda4dc7a3decd4d31b1abcedcf7c58) Thanks [@itrogers](https://github.com/itrogers)! - feat: ticket costs and the do-not-exceed approval workflow. Tickets carry vendor costs — estimate and actual phases, markup tiers, and an explicit customer price — recorded and edited from the ticket with a confirm step, an approver picker, and price-change events on the conversation thread. Crossing the do-not-exceed sends the ticket for approval with notified approvers, first-decision-wins, and deny-requires-comment. Org-side viewers see only the derived customer price; the vendor split stays on the Kohost side, and KFC-priced costs are immutable to org users. Costs can name their Vendor and the Work item that produced them. A solved ticket cannot close until every cost lands on a sent bill or is written off and every work item is billed or dispositioned no-charge; closing is an explicit action with a legible refusal. Cost writing is open to org users at role Agent and above.

- [#398](https://github.com/kohost/kohost/pull/398) [`f176c3b`](https://github.com/kohost/kohost/commit/f176c3b783fda4dc7a3decd4d31b1abcedcf7c58) Thanks [@itrogers](https://github.com/itrogers)! - feat: Work items on tickets. Schedule a visit from a vendor or a staff member — a performer, a wall-clock date, an optional time, and an optional scope description — then reschedule or cancel it. Every booking, move, and cancellation mints a requester-visible conversation event and notifies the thread's subscribers through their channel preferences. Visits list in a Work section above the conversation, with past visits dimmed.

## 7.7.1

### Patch Changes

- Add apex-american-audio driver to the driver enum

## 7.7.0

### Minor Changes

- [#414](https://github.com/kohost/kohost/pull/414) [`1fce585`](https://github.com/kohost/kohost/commit/1fce585da0a90443f74f5d2ad0bab189fb9c6f09) Thanks [@itrogers](https://github.com/itrogers)! - The legacy Cloudflare Images upload path is retired (kohost/kohost#142) in favor of the new `file-store` worker. Objects live in R2 under four read-scope tiers — public (unauthenticated read: org logos/icons in emails, TV media images, notification images, camera snapshots; ADR 0014), shared (any authenticated user: profile photos), org (org members), and property (ticket attachments) — and uploads carry a purpose label in object metadata. The two `/mediaFiles/*` upload endpoints and the AMQP image-service upload role are removed; the API re-hosts inbound MMS media and base64 camera snapshots itself via a service-token upload (`FILE_STORE_SERVICE_TOKEN` / worker secret `SERVICE_AUTH_TOKEN`), and a service-token-only `POST /files/metadata` endpoint lets the API stamp the ticket id onto attachment objects once the ticket or message they belong to is written. Existing Cloudflare Images delivery URLs keep rendering.

  Hardening: uploads enforce the 25 MB cap while reading the body, aborting with 413 the moment the multipart stream exceeds it, so an absent or lying `Content-Length` can no longer buffer an oversized body into isolate memory. Serves canonicalize image transforms and use the canonical URL as the edge cache key, bounding cache cardinality and billable unique transforms; cold reads serve native R2 range and conditional requests (206/304/416), and authorization always runs before any private cache access. Auth-gated tiers are served with `Cache-Control: private, no-cache` so browsers revalidate (and re-authorize) on every use, the public tier gets `public, max-age=86400`, and the app service worker excludes `/files/*` from its CacheStorage image cache, closing a gap where private attachment bytes stayed readable from the cache after logout or user switch. The API↔file-store wire contract (R2 key grammar, signed-read signature, shared field/header names) lives in a single `file-contract.ts` vendored byte-for-byte into both deployables so a change to one side cannot silently break the other.

  Fixes that fell out of the migration: admin organization logo/icon uploads target the organization being created or edited rather than the URL-derived one (so branding uploads work from `/admin/organizations/new`), a SuperAdmin can upload public-tier branding for an organization that does not exist until the same request creates it, inbound Twilio MMS media fetches attach HTTP Basic auth when Twilio credentials are configured, and notification snapshot re-hosting no longer drops media when the context carries `organizationId` without a hydrated `organization`. `npm run dev` now runs the file-store worker locally on Miniflare-simulated R2/KV, so uploads can be tested without real Cloudflare resources.

- [#414](https://github.com/kohost/kohost/pull/414) [`1fce585`](https://github.com/kohost/kohost/commit/1fce585da0a90443f74f5d2ad0bab189fb9c6f09) Thanks [@itrogers](https://github.com/itrogers)! - Ticket conversation messages now carry multiple attachments — images and common documents (PDF, Word, Excel, PowerPoint, txt, csv) — instead of a single image. Files upload through a new authenticated Cloudflare Worker, `file-store`, backed by R2 (ADR 0013). The conversation `message` schema gains `attachments: mediaFile[]`, superseding the singular `media`; legacy documents are normalized to a one-element `attachments` list at read time, with no bulk migration (ADR api-0029).

  In the app, attaching is consolidated into the message composer — replacing the camera icon and the single image-only "Photo" field in the ticket settings drawer — and works when creating a ticket, not just when replying, including attachment-only tickets with no body. Each message accepts up to 15 files, with the cap defined once as a shared `@kohost/api-client` constant rather than in the schema, so it can be tuned without a contract change. At most 5 files upload concurrently while the rest wait as queued chips, duplicate files (same name, size, and last-modified date) are skipped, and a failed send keeps the draft and its uploaded attachments so the user can retry.

  Messages render their attachments in a grid that adds columns as the count grows (up to 10) so nothing is hidden. Tapping a tile opens a lightbox that pages through the message's images with chevrons and arrow keys, shows an "n of N" counter, offers Download for the full-size original, and adds "Download all", which bundles the message's files into a zip named after the ticket, built in a web worker so a large download never blocks the main thread. PDF attachments show a real preview of the document's first page, rasterized to PNG at upload time with PDFium and stored beside the original in R2; preview generation is soft-fail, so a corrupt or unrenderable PDF uploads normally with a type-icon fallback.

  The API rejects a ticket message whose attachment points at a file-store object in a different organization or property than the ticket, so a notification can never mint a signed link to a cross-scope file.

- [#414](https://github.com/kohost/kohost/pull/414) [`1fce585`](https://github.com/kohost/kohost/commit/1fce585da0a90443f74f5d2ad0bab189fb9c6f09) Thanks [@itrogers](https://github.com/itrogers)! - Ticket messages support rich text (ADR 0012). The ticket schema accepts an optional `parsedBody.content` node tree (paragraphs, bullet/ordered lists, bold/italic/underline text, hard breaks, @-mentions); the API derives the plain-text `body` projection from the tree, extracts mention collaborators from mention nodes (legacy offset-based mentions still honored) so they receive mention notifications, and validates all appended conversation messages against the schema. Unknown nodes and marks are rejected, so the API must deploy before the app. Mention extraction on both sides guards malformed or forward-versioned trees, falling back to the plain-text `body` instead of throwing, and internal-note notification suppression reuses the read-path visibility predicate so an administrator who is the requester is notified about notes they can read.

  The app composes messages with a Tiptap editor (bold, italic, underline, lists, hard breaks, ⌘-shortcut formatting, @-mentions), replacing the legacy contenteditable input and its offset-based mention tokens, and renders rich-text trees client-side with a plain-text fallback for unrecognized nodes. The composer is a single surface with an always-visible toolbar — attach, reply/internal-note, @, formatting, and send — using Material Symbols at WCAG AA contrast; internal notes tint the composer amber so a hidden note cannot be mistaken for a public reply after the warning banner is dismissed. The new-ticket drawer's Description field embeds the same composer and shares the ticket's draft state via a `useTicketDraft` hook, so scheduled and recurring tickets carry rich-text descriptions (without attachments — they fire in the future). Conversation messages render through shadcn-style Message primitives with a stick-to-bottom scroller and a scroll-to-bottom button.

## 7.6.1

### Patch Changes

- [#437](https://github.com/kohost/kohost/pull/437) [`8ee2d2b`](https://github.com/kohost/kohost/commit/8ee2d2baa6120d6bc639c4c51caeeea203f21246) Thanks [@itrogers](https://github.com/itrogers)! - Speed up builds: incremental declaration emit (drop `tsc -b --force`, scope tsdown's clean away from `.d.ts` outputs), skip prettier in the model generator by default (`GENERATE_PRETTY=1` re-enables), and compile declarations with TypeScript 7. Emitted `.d.ts` now use TS7's output shape (`export declare class`, preserved `Command`/`CommandName` aliases in `./client`, and static getters on event classes that TS6 omitted).

## 7.6.0

### Minor Changes

- [#38](https://github.com/kohost/kohost/pull/38) [`34ab9d2`](https://github.com/kohost/kohost/commit/34ab9d28d869c1b52a0ec4a42c3a91fe4704ea31) Thanks [@kohost-bot](https://github.com/apps/kohost-bot)! - Customizable ticket notification preferences.

  - Admins get a new settings page at `/organizations/:slug/settings/notifications` to set org-wide channel defaults (email, SMS, push) for each ticket event and to lock events. Locked events still let users pick channels but require at least one.
  - Users get a matching matrix on their profile that inherits from org defaults, with column select-all and clear locked/blocked states. Overrides are deduped on save so later admin default changes flow through.
  - On the API, every ticket notification now flows through a single preference-aware dispatcher: effective channels are the user's preference for the event, falling back to the org default. Org defaults are stored on the Organization document at `features.Concierge.tickets.notifications` and served via `GET`/`PUT /v3/notifications/defaults` (writes gated to Administrator and above), with a seeded starter set when unset.
  - Event and channel enums are single-sourced in `@kohost/api-client` and re-exported through `@kohost/types`. The app reaches the new endpoints through shared api-client use cases instead of hand-rolled fetches, inheriting auth, org/property headers, and envelope handling.
  - Removes the legacy `Property.features.Concierge.newMessageChannel` field (migration `24_NOTIFICATION_PREFERENCES` unsets it), the requester ticket-confirmation SMS it gated, and the alarm-tag SMS escalation, which is now owned by Automations.

- [#318](https://github.com/kohost/kohost/pull/318) [`32fe1e6`](https://github.com/kohost/kohost/commit/32fe1e67376bb0a029815eaca8a014f158a086e4) Thanks [@itrogers](https://github.com/itrogers)! - Fix system-offline tickets being silently skipped when system entities lack a device type ([#317](https://github.com/kohost/kohost/issues/317)). `createSystemOfflineTicket` now derives the SystemCategory from the resolved space devices when `system.entities` can't produce one, and falls back to a generic `"other"` category (issue name "System: Communication Failure") instead of skipping ticket creation when neither entities nor devices resolve a category — a confirmed outage always opens a ticket. `UpsertSystemDevices` persists `type`/`discriminator` on new system entities and backfills them on existing type-less entities at driver startup. Adds `"other"` to the api-client system category enum.

- [#38](https://github.com/kohost/kohost/pull/38) [`34ab9d2`](https://github.com/kohost/kohost/commit/34ab9d28d869c1b52a0ec4a42c3a91fe4704ea31) Thanks [@kohost-bot](https://github.com/apps/kohost-bot)! - Rework ticket notification events around involvement. Preference matrices (org defaults and per-user) group events into **Directly involved** (requester, assignee, collaborator) and **Observing** (on the notify list), with plain-language labels spelling out when each fires.

  - New `ticketCreated`: at creation, collaborators and the requester (when the ticket is opened on their behalf) are notified. Copy never names you to yourself: recipients read "A new ticket was created by {requester}" while the requester reads "You created a new ticket", identical across email, SMS, and push.
  - New `addedAsCollaborator`: fires when a user is explicitly added as a collaborator on a ticket (email + push by default).
  - New `messageAsObserver`: observers get their own toggle for replies on tickets they watch, separate from the direct new-reply event.
  - `ticketResolvedAsAssignee` becomes `ticketResolved`: resolution now notifies everyone directly involved, mirroring creation.
  - Nobody is notified about their own action.

## 7.5.0

### Minor Changes

- [#313](https://github.com/kohost/kohost/pull/313) [`46ee45e`](https://github.com/kohost/kohost/commit/46ee45eaf5bad2573fccadbba780ac7426f2def1) Thanks [@itrogers](https://github.com/itrogers)! - Auto-close solved tickets after a per-organization grace period and make `closed` a terminal, locked status ([#192](https://github.com/kohost/kohost/issues/192), [#193](https://github.com/kohost/kohost/issues/193), [#194](https://github.com/kohost/kohost/issues/194), [#195](https://github.com/kohost/kohost/issues/195), [#196](https://github.com/kohost/kohost/issues/196), [#197](https://github.com/kohost/kohost/issues/197)).

  `solved` is now provisional and `closed` terminal (ADR 0022): `closed → open/pending` is rejected, a message on a closed ticket is rejected with `TICKET_CLOSED` (the app disables replying and offers "Start a new request"), and reopen-on-message stays for solved/pending tickets. Solving a ticket schedules a unique-per-ticket close job at `solvedAt + Organization.features.Concierge.tickets.autoCloseAfterMinutes` (new schema field, stored in minutes, default 10080 = 7 days, min 5 minutes; the Concierge settings UI edits it with a minutes/hours/days unit selector and shows the saved value in its largest evenly-dividing unit); the job closes still-solved tickets through `UpdateTicket` with a system "Ticket automatically closed" event, emitting `TICKET_UPDATED` but not `TICKET_RESOLVED`. A migration backfills the existing solved backlog (aged tickets close in bulk, within-grace tickets get scheduled jobs, `updatedAt` fallback when `solvedAt` is absent) and stamps the default grace onto every tickets-enabled organization that lacks it, so the effective policy is readable from the org document rather than implied by the code default. The dead `autoCloseAt` field, `AutoCloseTickets` use case, and `POST /tickets/autoClose` route are removed.

## 7.4.0

### Minor Changes

- [#294](https://github.com/kohost/kohost/pull/294) [`f3c11d1`](https://github.com/kohost/kohost/commit/f3c11d1ff9393872722dd6cd2c353ead269a076a) Thanks [@itrogers](https://github.com/itrogers)! - Add CopyIssueRouting use case (POST /v3/issues/copy-routing) that mirrors an Issue's department and default routing onto many distinct Issues (all Issue types, source survives), with a CopyIssueRoutingCommand in @kohost/api-client and a "Copy routing to..." action in the Concierge issue editor and settings list.

- [#294](https://github.com/kohost/kohost/pull/294) [`f3c11d1`](https://github.com/kohost/kohost/commit/f3c11d1ff9393872722dd6cd2c353ead269a076a) Thanks [@itrogers](https://github.com/itrogers)! - Add MergeIssue use case (POST /v3/issues/merge) that repoints every Ticket from source Issues onto a target across all properties, then hard-deletes the sources, with a MergeIssueCommand in @kohost/api-client.

- [#294](https://github.com/kohost/kohost/pull/294) [`f3c11d1`](https://github.com/kohost/kohost/commit/f3c11d1ff9393872722dd6cd2c353ead269a076a) Thanks [@itrogers](https://github.com/itrogers)! - Track ticket reopens as first-class data instead of parsing audit text ([#282](https://github.com/kohost/kohost/issues/282), [#281](https://github.com/kohost/kohost/issues/281)).

  `TicketRepository.update` is now the single choke point for status transitions: every status-write path (`UpdateTicket` and the `CreateTicketMessage` auto-reopen) maintains a denormalized `reopenCount` and emits the `statusChanged` conversation entry, so no use case can forget. Reopens via posting a message — previously invisible in `conversation[]` — are now recorded.

  - Adds `reopenCount` to the ticket: incremented on each transition back to `open` from `solved`/`closed`. `reopenCount > 0` answers "was this ticket reopened?" in O(1); missing on legacy tickets reads as `0`.
  - Adds structured `{ from, to }` fields to `statusChanged` conversation entries so consumers detect reopens without regex-matching the body string.
  - Removes the unused `UpdateTicketStatus` use case and `PUT /tickets/:id/status` route (status is written through `UpdateTicket`), plus the `TicketRepository.updateStatus` wrapper.

## 7.3.0

### Minor Changes

- [#39](https://github.com/kohost/kohost/pull/39) [`6d6eb96`](https://github.com/kohost/kohost/commit/6d6eb96a0db9f787195820531dce2843daa23cf6) Thanks [@kohost-bot](https://github.com/apps/kohost-bot)! - Add customizable, organization-scoped SOS type libraries that replace the fixed `activeEmergencies` emergency enum. Property `features.SOS` now carries `selectedSOSTypeIds` (the property's configured tiles) and `activeSOSTypeIds` (the tiles active during an incident); the legacy `activeEmergencies` enum is removed from the api-client property schema. SOS types live in each organization's own database under per-org databases, with per-property tile selection and reordering, organization-wide bulk assignment, automation integration, and standard-type seeding on organization creation. Includes the `17_SOS_TYPES` startup migration that seeds the standard types per organization, rewrites each property's `features.SOS` to the ID-array shape, and migrates automation trigger filters, `StartSOS` action params, and `SendNotification` template references off the legacy emergency strings. Restores email/SMS default SOS notifications with per-tile name interpolation.

- [#39](https://github.com/kohost/kohost/pull/39) [`6d6eb96`](https://github.com/kohost/kohost/commit/6d6eb96a0db9f787195820531dce2843daa23cf6) Thanks [@kohost-bot](https://github.com/apps/kohost-bot)! - Promote `SOSType` to a first-class `@kohost/api-client` entity. The JSON schema now lives in `packages/api-client/src/schemas/sosType.ts` and is registered in the schema index, so the build generates a shared `Models.SOSType` class + validator alongside every other domain entity (`Department`, `Issue`, etc.). The API's `SOSTypeRepository` and SOS Type use cases now consume `SOSType`/`SOSTypeData` from `@kohost/api-client/models`, and the duplicate `apps/api/src/lib/domain/sos-types/{model,schema}.ts` are removed. `@kohost/types` re-exports the entity (`@kohost/types/sosType`), which the app now uses in place of its divergent local `SOSTypeData` (previously carried a phantom `organizationId` and lacked `nameKey`). No behavior or wire-format change.

- [#39](https://github.com/kohost/kohost/pull/39) [`6d6eb96`](https://github.com/kohost/kohost/commit/6d6eb96a0db9f787195820531dce2843daa23cf6) Thanks [@kohost-bot](https://github.com/apps/kohost-bot)! - Org-wide SOS Type ordering. Org admins can drag SOS Types into a custom order in the org SOS library (dnd-kit, optimistic + debounced), persisted once on the Organization at `features.SOS.types.order` through the existing admin-gated `UpdateOrganizationFeatures` endpoint (reconciled on every write: unknown/duplicate IDs dropped, eligible-but-omitted IDs appended). `DescribeSOS` now renders each Property's subset (own-selected ∪ org-wide) in that order server-side — ordered IDs first, remaining SOS Types alphabetically by name, deleted IDs skipped. No per-property ordering, no backfill migration; both read and write paths self-heal. Reordering never changes a SOS Type's ID, so automations keep firing. Adds an `SOS` branch to the Organization schema, generalizes the shared `sortByConciergeOrder` util to `sortByPersistedOrder`, and standardizes user-facing copy on "SOS Type" (was "tile").

- [#39](https://github.com/kohost/kohost/pull/39) [`6d6eb96`](https://github.com/kohost/kohost/commit/6d6eb96a0db9f787195820531dce2843daa23cf6) Thanks [@kohost-bot](https://github.com/apps/kohost-bot)! - Move SOS Type availability onto the type itself as a `scope` object that mirrors an Issue's routing: an org-wide `default` plus a sparse map of per-Property overrides (`{ default, properties }`). This replaces the old two-sided membership model (`SOSType.appliesToAllProperties` + `Property.features.SOS.selectedSOSTypeIds`), both of which are removed. The `sosType` schema is now strict: `scope` is required and unknown fields are rejected (`additionalProperties: false`), so legacy-shaped documents fail validation instead of passing silently. `resolveScope(scope, propertyId)` returns a Property's override when present, otherwise the default — so `default: true` offers a type everywhere (including Properties added later), `properties[id]: false` opts one out, and `properties[id]: true` opts one in when the default is off.

  `DescribeSOS` now resolves each Property's offered subset from scope and returns it as `offeredSOSTypeIds` (renamed from `selectedSOSTypeIds`), ordered by the organization's curated `features.SOS.types.order`. The fixed 1–9 tile cap and the per-Property "at least one tile" minimum are gone — a Property offers as many types as its scope resolves to. Editing or deleting a SOS Type is still blocked while any Property in the organization has an active SOS incident (now a coarse, type-agnostic guard). Narrowing a type's scope is gated the same way deleting it is: a scope change that removes a Property's coverage while automations at that Property still reference the type is rejected with `SOS_TYPE_HAS_REFERENCES` listing the referencing automations, so scope removal can't orphan live automations. Migration `19_SOS_TYPES` seeds the standard types org-wide (`scope.default: true`) and drops the retired `selectedSOSTypeIds` from Property SOS state.

## 7.2.0

### Minor Changes

- [#180](https://github.com/kohost/kohost/pull/180) [`13d897b`](https://github.com/kohost/kohost/commit/13d897ba750099f39d8707a58ca23817eed5bc7a) Thanks [@itrogers](https://github.com/itrogers)! - Add server-side sort presets to the Concierge ticket list. Staff can order tickets by Priority (high to low, the default, or low to high), Created (newest/oldest), or Reply (newest/oldest) from a sort dropdown; the choice lives in the URL (shareable, survives refresh) and drives MongoDB ordering across the whole organization rather than the legacy client-side sort over a capped fetch. Two denormalized, indexed keys — `priorityRank` and `lastMessageAt` (last human reply, excluding bookkeeping events) — are maintained by `TicketRepository` and backfilled across all organization databases. The client sends a closed-set preset key that the server validates and maps to a sort spec; an invalid or absent value falls back to the Priority high to low composite default.

## 7.1.1

### Patch Changes

- [#222](https://github.com/kohost/kohost/pull/222) [`a9970fb`](https://github.com/kohost/kohost/commit/a9970fb67f4fa84e3c8eeed14e58e124280b47eb) Thanks [@itrogers](https://github.com/itrogers)! - Speed up API client builds by emitting declarations with TypeScript, and migrate JavaScript emit from the deprecated tsup to its successor tsdown.

## 7.1.0

### Minor Changes

- [#213](https://github.com/kohost/kohost/pull/213) [`c9158f1`](https://github.com/kohost/kohost/commit/c9158f1841d487132a4a940b50bc55d829e399e8) Thanks [@itrogers](https://github.com/itrogers)! - Add denormalized `priorityRank` and `lastMessageAt` fields to the ticket schema (additive, optional, never set by clients). These are not yet read or written by the API or app — shipping the schema ahead of the Concierge sort-presets feature lets existing tickets be safely backfilled while the current code tolerates the new fields.

## 7.0.0

### Major Changes

- [#67](https://github.com/kohost/kohost/pull/67) [`8af8d3b`](https://github.com/kohost/kohost/commit/8af8d3b94be7ece0dfb56737da00005fc8d21aad) Thanks [@kohost-bot](https://github.com/apps/kohost-bot)! - Restructure `Issue` and `Vendor` for the org-DBs cutover; add optional `propertyId` to every Tier A entity schema.

  - `Issue`: `departmentId` stays flat at the top level (org-level, one value per issue). System-Issue fields are grouped under a new `system` block (`category`, `notification`, and `excludedEntities` — the device IDs muted for this issue, replacing the old flat `excludedResources`). All ticket-routing moves under a new `routing: { default, properties: { [propertyId]: {...} } }` block: `routing.default` is the org-level default and `routing.properties` holds sparse per-property overrides that fall back to it. A `null` at `routing.default` or at a per-property entry means routing is **suppressed** (replacing the old boolean `autoCreateTicket`). Each routing override carries `assignedTo` (a discriminated `{ id, discriminator: "user" | "vendor" }` matching the shape `ticket.assignedTo` already uses, replacing the legacy `autoAssign.{ userId, vendorId }` pair), `priority`, `tags`, and `notify`.
  - `Vendor`: new `properties: string[]` field — list of `propertyId`s where the vendor is enabled. Contact fields (name, phone, email, address, photo) stay flat at the top level; no per-property contact overrides.
  - Tier A entities (`Space`, every device discriminator — `alarm`, `camera`, `dimmer`, `lock`, `motionSensor`, `switch`, `thermostat`, `windowCovering`, `mediaSource` — plus `Automation`, `Ticket`, `Reservation`, `MediaFile`, `EnergyReport`, `Announcement`, `Log`, `Notification`, `EmailMessage`, `SmsMessage`, `ShortLink`, `Order`, `Payment`, `Product`, `TimeSheet`, `Category`, `Gateway`, `Courtesy`) accept optional `propertyId` for org-DB residency.

  Breaking — consumers of `Issue`/`Vendor` must update their payload shapes; consumers of any Tier A entity must accept the new optional `propertyId` field on read.

- [#67](https://github.com/kohost/kohost/pull/67) [`8af8d3b`](https://github.com/kohost/kohost/commit/8af8d3b94be7ece0dfb56737da00005fc8d21aad) Thanks [@kohost-bot](https://github.com/apps/kohost-bot)! - Rename the property `appFeatures` field to `features` and the `RoomControl` app-feature to `SmartBuilding` on the `Property` schema. The `@kohost/types` `SOS` type follows the rename (`PropertyData["features"]`).

  Breaking — consumers reading `property.appFeatures` or the `RoomControl` feature key must switch to `property.features` / `SmartBuilding`.

### Minor Changes

- [#67](https://github.com/kohost/kohost/pull/67) [`8af8d3b`](https://github.com/kohost/kohost/commit/8af8d3b94be7ece0dfb56737da00005fc8d21aad) Thanks [@kohost-bot](https://github.com/apps/kohost-bot)! - Add user-tied API keys: replace the per-Property shared secret with an `apiKey` Credential scoped to a `(User, Organization)` pair. Adds `CreateApiKey`, `RotateApiKey`, and `RevokeApiKey` use cases gated to SuperAdmin. Rotation is a hard cutover — minting a new secret invalidates the old one immediately; revocation deletes the Credential.

  `@kohost/api-client` gains the `GetApiKey`, `CreateApiKey`, `RotateApiKey`, and `RevokeApiKey` use cases. `@kohost/app` adds an API Keys card to the user-detail view (profile and edit-User), shown to SuperAdmins, with a one-time secret reveal modal on create and rotate.

- [#67](https://github.com/kohost/kohost/pull/67) [`8af8d3b`](https://github.com/kohost/kohost/commit/8af8d3b94be7ece0dfb56737da00005fc8d21aad) Thanks [@kohost-bot](https://github.com/apps/kohost-bot)! - Add `apiKey` Credential discriminator and `keyHash` field for user-tied API keys.

- [#67](https://github.com/kohost/kohost/pull/67) [`8af8d3b`](https://github.com/kohost/kohost/commit/8af8d3b94be7ece0dfb56737da00005fc8d21aad) Thanks [@kohost-bot](https://github.com/apps/kohost-bot)! - Add an optional `notes` field to Vendors (free text, max 1000 chars). Editable via a textarea on the vendor form and shown in the users/vendors detail panel.

## 6.5.0

### Minor Changes

- [`1ed00b4`](https://github.com/kohost/kohost/commit/1ed00b4a47147235ec3dd1416c1b3ba08bc0bd91) Thanks [@itrogers](https://github.com/itrogers)! - Add the `linortek` device driver to the driver definitions enum, and mark server-reported switch schema fields (`type`, `discriminator`, `driver`, `offline`, `systemId`, `watts`, `manufacturer`, `modelNumber`, `serialNumber`, `firmwareVersion`) as `readOnly`.

## 6.4.1

### Patch Changes

- [`7992cc8`](https://github.com/kohost/kohost/commit/7992cc8b4a04a5b6ded18c6555e07e58a2f3dfc7) Thanks [@itrogers](https://github.com/itrogers)! - Restrict every Server management use case (Create/Describe/List/Update/Delete) to SuperAdmins and scope servers to the request's property: CreateServer stamps `propertyId` from the request context and ListServers filters by it so a per-org database only surfaces the active property's servers. The server schema's date fields now reference the shared `date` definition instead of inlining `string`/`date-time`.

## 6.4.0

### Minor Changes

- [`0c9627c`](https://github.com/kohost/kohost/commit/0c9627c552e1176cffff9b9a5772eff7af187f5a) Thanks [@itrogers](https://github.com/itrogers)! - Add ONVIF driver and integration

## 6.3.2

### Patch Changes

- [`6e1b069`](https://github.com/kohost/kohost/commit/6e1b069156970089fd7a96e8eec66bf6374d0032) Thanks [@itrogers](https://github.com/itrogers)! - Move json-schema-to-ts to a production dependency so the published package's type imports resolve for consumers.

## 6.3.1

### Patch Changes

- [`cfde09b`](https://github.com/kohost/kohost/commit/cfde09b9d18939c702c1ca43985fea9f7c7d755a) Thanks [@itrogers](https://github.com/itrogers)! - Mark server-reported thermostat schema fields (`id`, `type`, `driver`, `offline`, `currentTemperature`, `currentHumidity`, `hvacState`) as `readOnly`.

## 6.3.0

### Minor Changes

- [`8d44fbf`](https://github.com/kohost/kohost/commit/8d44fbf7babbe314cecc76d4ab2cc24b9dc0707e) Thanks [@itrogers](https://github.com/itrogers)! - Add `Button` and `Motion` alert types (and `Cost`) to the alert definitions enum, and reference `alerts` from the camera schema.

## 6.2.1

### Patch Changes

- [`19b66de`](https://github.com/kohost/kohost/commit/19b66dee3779dec255f4b1c557020e389e63a5f1) Thanks [@itrogers](https://github.com/itrogers)! - Add `honeywell-resideo` to the driver definitions schema.

## 6.2.0

### Minor Changes

- [`2dd8ae1`](https://github.com/kohost/kohost/commit/2dd8ae1074af1c9c579039436a61cc49299fdd3a) Thanks [@itrogers](https://github.com/itrogers)! - Add `mock` to the driver enum and register the Kohost Mock system.

## 6.1.0

### Minor Changes

- [`c9599ae`](https://github.com/kohost/kohost/commit/c9599aef7977ff92ff0f13cb39a35c9dc8af58b4) Thanks [@itrogers](https://github.com/itrogers)! - Migrate `@kohost/api-client` into the kohost-mono workspace. Publishing now flows through changesets in the monorepo via npm trusted publishing; `kohost/api-client` becomes a read-only mirror kept in sync by CI. Bumps the package's TypeScript devDependency to `^6.0.3` to align with the rest of the monorepo.
