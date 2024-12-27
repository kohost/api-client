const esbuild = require("esbuild");

const formats = ["esm", "cjs"];

const builds = formats.map((format) => {
  esbuild.build({
    entryPoints: ["src/Models/Entity.js"],
    bundle: true,
    platform: "node",
    target: "node20",
    outfile: `dist/${format}/models/entity.js`,
    format,
  });

  esbuild.build({
    entryPoints: ["src/schemas/*.js"],
    bundle: false,
    platform: "node",
    target: "node20",
    plugins: [require("./generate-models")(format)],
    outdir: `dist/${format}/models`,
    format,
  });

  esbuild.build({
    entryPoints: ["src/Commands/*.js"],
    bundle: false,
    platform: "node",
    target: "node20",
    outdir: `dist/${format}/commands`,
    format,
  });

  esbuild.build({
    entryPoints: ["src/Errors/*.js"],
    bundle: false,
    platform: "node",
    target: "node20",
    outdir: `dist/${format}/errors`,
    format,
  });
});

Promise.all(builds);
