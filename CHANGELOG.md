# @kohost/api-client

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
