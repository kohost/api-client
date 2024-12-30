export const GenerateIndexPlugin = (options = { excludeFiles: [] }) => ({
  name: "generate-index",
  async setup(build) {
    const esbuild = build.esbuild;
    const outdir = build.initialOptions.outdir;
    const format = build.initialOptions.format;
    const files = [];

    build.onLoad({ filter: /\.js$/ }, async (args) => {
      const filename = args.path.split("/").pop();
      if (!options.excludeFiles.includes(filename)) {
        files.push(filename);
      }
    });

    build.onEnd(async () => {
      const code = files
        .map((file) => `export * from "./${file.replace(/\.js$/, "")}";`)
        .join("\n");

      await esbuild.build({
        stdin: {
          contents: code,
          loader: "js",
        },
        write: true,
        outfile: `${outdir}/index.js`,
        format,
      });
    });
  },
});
