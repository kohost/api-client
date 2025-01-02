import * as esbuild from "esbuild";
// eslint-disable-next-line
import { dTSPathAliasPlugin } from "esbuild-plugin-d-ts-path-alias";
import useCases from "../src/useCases/http.json" assert { type: "json" };
import { GenerateIndexPlugin } from "./generate-index.mjs";
import { GenerateModelPlugin } from "./generate-models.mjs";
import { GenerateUseCases } from "./generate-useCases.mjs";
import { GenerateValidatorPlugin } from "./generate-validators.mjs";
import { RemoveNodeExportsPlugin } from "./remove-node-exports.mjs";

const formats = ["esm", "cjs"];
const platforms = ["node", "browser"];

const target = "esnext";

function outExtension(format) {
  return {
    ".js": ".js",
  };
}

const builds = formats.map((format) => {
  platforms.map((platform) => {
    esbuild.build({
      entryPoints: ["src/models/entity.mjs"],
      bundle: true,
      target,
      outdir: `dist/${platform}/${format}/models`,
      resolveExtensions: [".mjs", ".js"],
      platform,
      keepNames: true,
      format,
    });

    esbuild.build({
      entryPoints: ["src/schemas/*.mjs"],
      bundle: false,
      target,
      plugins: [
        GenerateIndexPlugin({ excludeFiles: ["definitions.mjs"] }),
        GenerateModelPlugin({ excludeFiles: ["definitions.mjs"] }),
      ],
      outdir: `dist/${platform}/${format}/models`,
      platform,
      keepNames: true,
      format,
    });

    esbuild.build({
      entryPoints: ["src/schemas/*.mjs"],
      bundle: true,
      target,
      plugins: [
        GenerateIndexPlugin({ excludeFiles: ["definitions.mjs"] }),
        GenerateValidatorPlugin({ excludeFiles: ["definitions.mjs"] }),
      ],
      outdir: `dist/${platform}/${format}/validators`,
      platform: "node",
      keepNames: true,
      format,
    });

    esbuild.build({
      entryPoints: ["src/commands/*.mjs"],
      bundle: false,
      target,
      plugins: [GenerateIndexPlugin()],
      outdir: `dist/${platform}/${format}/commands`,
      platform,
      keepNames: true,
      format,
    });

    esbuild.build({
      entryPoints: ["src/errors/*.mjs"],
      bundle: false,
      target,
      plugins: [GenerateIndexPlugin()],
      outdir: `dist/${platform}/${format}/errors`,
      platform,
      keepNames: true,
      format,
    });

    esbuild.build({
      entryPoints: ["src/events/*.mjs"],
      bundle: false,
      target,
      plugins: [GenerateIndexPlugin()],
      outdir: `dist/${platform}/${format}/events`,
      platform,
      keepNames: true,
      format,
    });

    esbuild.build({
      entryPoints: ["src/*.mjs"],
      plugins: [GenerateUseCases(new Map(useCases)), RemoveNodeExportsPlugin],
      bundle: false,
      target,
      outdir: `dist/${platform}/${format}`,
      keepNames: true,
      platform,
      format,
    });

    esbuild.build({
      bundle: true,
      target: "es2019",
      format: "esm",
      entryPoints: ["./src/index.mjs"],
      outfile: "dist/types/index.d.ts",
      plugins: [dTSPathAliasPlugin()],
    });
  });
});

Promise.all(builds);
