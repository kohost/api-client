#!/usr/bin/env node
/**
 * Dev watcher for @kohost/api-client.
 *
 * - Watches `src/` recursively; debounced re-runs of generate-models on change
 * - Runs `tsdown --watch` in parallel, which observes `.generated/` and rebuilds `dist/`
 *
 * Wired into the root `npm run dev` via `turbo run dev` — turbo's `^build`
 * dependency ensures the first full build is already in cache before this
 * starts (populating `.generated/` and `dist/`), so the dev loop is purely
 * incremental and we skip the initial generate-models step.
 */
import { spawn } from "node:child_process";
import { watch } from "node:fs";

const PKG_ROOT = new URL("..", import.meta.url).pathname;

function runOnce(cmd, args) {
  return new Promise((resolve, reject) => {
    const p = spawn(cmd, args, {
      cwd: PKG_ROOT,
      stdio: "inherit",
      shell: process.platform === "win32",
    });
    p.on("error", reject);
    p.on("exit", (code) =>
      code === 0 ? resolve() : reject(new Error(`${cmd} exited ${code}`)),
    );
  });
}

// `^build` (via turbo's @kohost/api-client#dev → @kohost/api-client#build dep)
// has already run generate-models and populated dist/. Skip the redundant
// initial generation, and tell tsdown not to wipe dist on startup so downstream
// dev tasks (e.g. vite) never see an empty dist directory.
//
// tsdown --watch refreshes dist/*.js only; declarations are emitted by tsc in
// `build:types`, not here, so dist/*.d.ts go stale during dev. That's fine:
// consumers get fresh types at build time via Turbo's ^build, and dev runtime
// resolves the live .js. Don't add a tsc --watch here just to chase it.
const tsdown = spawn("tsdown", ["--watch"], {
  cwd: PKG_ROOT,
  stdio: "inherit",
  shell: process.platform === "win32",
  env: { ...process.env, BUILD_CLEAN: "false" },
});

function shutdown() {
  tsdown.once("exit", () => process.exit(0));
  tsdown.kill("SIGTERM");
}
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

let pending = false;
let running = false;
let debounceTimer = null;

async function regenerate() {
  if (running) {
    pending = true;
    return;
  }
  running = true;
  try {
    console.log("⟳ api-client dev: src/ changed, regenerating models");
    await runOnce("tsx", ["scripts/generate-source-models.js"]);
  } catch (err) {
    console.error("✗ api-client dev: generate-models failed:", err.message);
  }
  running = false;
  if (pending) {
    pending = false;
    regenerate();
  }
}

watch(`${PKG_ROOT}/src`, { recursive: true }, () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(regenerate, 150);
});
