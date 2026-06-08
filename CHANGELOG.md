# @kohost/api-client

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
