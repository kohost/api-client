import { defineConfig } from "tsdown";

export default defineConfig({
  format: ["esm"],
  dts: false,
  unbundle: true,
  sourcemap: true,
  target: "es2022",
  platform: "node",
  outExtensions: () => ({ js: ".js" }),
  entry: [
    ".generated/index.ts",
    ".generated/events/*",
    ".generated/errors/*",
    ".generated/commands/*",
    ".generated/lib/*",
    ".generated/models/*",
    ".generated/useCases/*",
    ".generated/schemas/*",
    ".generated/httpClient.js",
    ".generated/validate.ts",
  ],
  outDir: "dist",
  // Scoped to tsdown's own outputs: tsc -b emits .d.ts into dist incrementally,
  // and wiping them would force a full re-typecheck on every build.
  clean:
    process.env.BUILD_CLEAN === "false"
      ? false
      : ["dist/**/*.js", "dist/**/*.js.map"],
});
