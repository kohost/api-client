import * as esbuild from "esbuild";
import useCases from "../src/useCases/http.json" assert { type: "json" };
import { GenerateModelPlugin } from "./generate-models.js";
import { GenerateUseCases } from "./generate-useCases.js";
import { GenerateValidatorPlugin } from "./generate-validators.js";

const formats = ["esm", "cjs"];

const target = "node20";

const builds = formats.map((format) => {
  esbuild.build({
    entryPoints: ["src/Models/Entity.js"],
    bundle: true,
    platform: "node",
    target,
    outfile: `dist/${format}/models/entity.js`,
    keepNames: true,
    format,
  });

  esbuild.build({
    entryPoints: ["src/schemas/*.js"],
    bundle: false,
    platform: "node",
    target,
    plugins: [GenerateModelPlugin({ excludeFiles: ["definitions.js"] })],
    outdir: `dist/${format}/models`,
    keepNames: true,
    format,
  });

  esbuild.build({
    entryPoints: ["src/schemas/*.js"],
    bundle: false,
    platform: "node",
    target,
    plugins: [GenerateValidatorPlugin({ excludeFiles: ["definitions.js"] })],
    outdir: `dist/${format}/validators`,
    keepNames: true,
    format,
  });

  esbuild.build({
    entryPoints: ["src/Commands/*.js"],
    bundle: false,
    platform: "node",
    target,
    outdir: `dist/${format}/commands`,
    keepNames: true,
    format,
  });

  esbuild.build({
    entryPoints: ["src/Errors/*.js"],
    bundle: false,
    platform: "node",
    target,
    outdir: `dist/${format}/errors`,
    keepNames: true,
    format,
  });

  esbuild.build({
    entryPoints: ["src/Events/*.js"],
    bundle: false,
    platform: "node",
    target,
    outdir: `dist/${format}/events`,
    keepNames: true,
    format,
  });

  esbuild.build({
    entryPoints: ["src/*.js"],
    plugins: [GenerateUseCases(new Map(useCases))],
    bundle: false,
    platform: "node",
    target,
    outdir: `dist/${format}`,
    keepNames: true,
    format,
  });
});

Promise.all(builds);
