#!/usr/bin/env node
/**
 * Dev watcher for @kohost/api-client.
 *
 * - Watches `src/` recursively; debounced re-runs of generate-models on change
 * - Runs `tsup --watch` in parallel, which observes `.generated/` and rebuilds `dist/`
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
// initial generation, and tell tsup not to wipe dist on startup so downstream
// dev tasks (e.g. vite) never see an empty dist directory.
const tsup = spawn("tsup", ["--watch"], {
  cwd: PKG_ROOT,
  stdio: "inherit",
  shell: process.platform === "win32",
  env: { ...process.env, TSUP_CLEAN: "false" },
});

function shutdown() {
  tsup.once("exit", () => process.exit(0));
  tsup.kill("SIGTERM");
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
