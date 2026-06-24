# @kohost/api-client

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
