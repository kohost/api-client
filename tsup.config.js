import { defineConfig } from "tsup";
import { readFileSync, writeFileSync, readdirSync, statSync } from "fs";
import { join } from "path";

// Post-process ESM files to add .js extensions to relative imports
function addJsExtensions(dir) {
  const files = readdirSync(dir);
  for (const file of files) {
    const filePath = join(dir, file);
    const stat = statSync(filePath);
    if (stat.isDirectory()) {
      addJsExtensions(filePath);
    } else if (file.endsWith(".js")) {
      let content = readFileSync(filePath, "utf8");
      // Match relative imports without .js extension
      content = content.replace(
        /(from\s+["'])(\.\.?\/[^"']+)(["'])/g,
        (match, prefix, path, suffix) => {
          if (!path.endsWith(".js")) {
            return `${prefix}${path}.js${suffix}`;
          }
          return match;
        },
      );
      writeFileSync(filePath, content);
    }
  }
}

// Post-process CJS files to add .cjs extensions to relative requires
function addCjsExtensions(dir) {
  const files = readdirSync(dir);
  for (const file of files) {
    const filePath = join(dir, file);
    const stat = statSync(filePath);
    if (stat.isDirectory()) {
      addCjsExtensions(filePath);
    } else if (file.endsWith(".cjs")) {
      let content = readFileSync(filePath, "utf8");
      // Match relative requires and replace .js with .cjs or add .cjs if no extension
      content = content.replace(
        /(require\s*\(\s*["'])(\.\.?\/[^"']+)(["']\s*\))/g,
        (match, prefix, path, suffix) => {
          if (path.endsWith(".cjs")) {
            return match;
          }
          if (path.endsWith(".js")) {
            return `${prefix}${path.slice(0, -3)}.cjs${suffix}`;
          }
          return `${prefix}${path}.cjs${suffix}`;
        },
      );
      writeFileSync(filePath, content);
    }
  }
}

// Shared config for ESM builds
const esmConfig = {
  format: ["esm"],
  dts: true,
  bundle: false,
  splitting: false,
  sourcemap: true,
  target: ["es2022"],
  platform: "node",
  keepNames: true,
};

// Shared config for CJS builds
const cjsConfig = {
  format: ["cjs"],
  dts: true,
  bundle: false,
  splitting: false,
  sourcemap: true,
  target: ["es2022"],
  platform: "node",
  keepNames: true,
};

export default defineConfig([
  // ESM build - all source files from .generated
  {
    ...esmConfig,
    entry: [
      ".generated/index.ts",
      ".generated/events/*",
      ".generated/errors/*",
      ".generated/commands/*",
      ".generated/models/*",
      ".generated/useCases/*",
      ".generated/schemas/*",
      ".generated/httpClient.js",
      ".generated/amqpClient.js",
      ".generated/validate.ts",
    ],
    outDir: "dist/esm",
    esbuildOptions(options) {
      options.outbase = ".generated";
      return options;
    },
    onSuccess: async () => {
      addJsExtensions("dist/esm");
    },
    clean: true,
  },
  // CJS build - all source files from .generated
  {
    ...cjsConfig,
    entry: [
      ".generated/index.ts",
      ".generated/events/*",
      ".generated/errors/*",
      ".generated/commands/*",
      ".generated/models/*",
      ".generated/useCases/*",
      ".generated/schemas/*",
      ".generated/httpClient.js",
      ".generated/amqpClient.js",
      ".generated/validate.ts",
    ],
    outDir: "dist/cjs",
    esbuildOptions(options) {
      options.outbase = ".generated";
      return options;
    },
    onSuccess: async () => {
      addCjsExtensions("dist/cjs");
    },
    clean: true,
  },
]);
