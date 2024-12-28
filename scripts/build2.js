import { build } from "esbuild";
import { GenerateModelPlugin } from "./generate-models.js";
import { GenerateValidatorPlugin } from "./generate-validators.js";

const formats = ["esm", "cjs"];

const builds = formats.map((format) => {
  build({
    entryPoints: ["src/Models/Entity.js"],
    bundle: true,
    platform: "node",
    target: "node20",
    outfile: `dist/${format}/models/entity.js`,
    format,
  });

  build({
    entryPoints: ["src/schemas/*.js"],
    bundle: false,
    platform: "node",
    target: "node20",
    plugins: [GenerateModelPlugin({ excludeFiles: ["definitions.js"] })],
    outdir: `dist/${format}/models`,
    format,
  });

  build({
    entryPoints: ["src/schemas/*.js"],
    bundle: false,
    platform: "node",
    target: "node20",
    plugins: [GenerateValidatorPlugin({ excludeFiles: ["definitions.js"] })],
    outdir: `dist/${format}/validators`,
    format,
  });

  build({
    entryPoints: ["src/Commands/*.js"],
    bundle: false,
    platform: "node",
    target: "node20",
    outdir: `dist/${format}/commands`,
    format,
  });

  build({
    entryPoints: ["src/Errors/*.js"],
    bundle: false,
    platform: "node",
    target: "node20",
    outdir: `dist/${format}/errors`,
    format,
  });

  build({
    entryPoints: ["src/Events/*.js"],
    bundle: false,
    platform: "node",
    target: "node20",
    outdir: `dist/${format}/events`,
    format,
  });

  build({
    entryPoints: ["src/*.js"],
    bundle: false,
    platform: "node",
    target: "node20",
    outdir: `dist/${format}`,
    format,
  });
});

Promise.all(builds);
