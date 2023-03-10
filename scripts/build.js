const esbuild = require("esbuild");
const path = require("node:path");
const fs = require("node:fs");
const useCases = require("../src/useCases/http.json");
const useCaseMap = new Map(useCases);

if (!fs.existsSync(path.resolve(__dirname, "../dist/cjs"))) {
  fs.mkdirSync(path.resolve(__dirname, "../dist/cjs"), { recursive: true });
}

if (!fs.existsSync(path.resolve(__dirname, "../dist/esm"))) {
  fs.mkdirSync(path.resolve(__dirname, "../dist/esm"), { recursive: true });
}

let useCasePlugin = {
  name: "useCasePlugin",
  setup(build) {
    build.onLoad(
      { filter: /src\/Client\/index.js/, namespace: "file" },
      async (args) => {
        const fileText = await fs.promises.readFile(args.path, "utf8");

        // create a require statement for each use case
        const useCaseRequireStatements = [];
        // attached each method to the UseCase class
        const useCaseClassMethods = [];

        for (const [useCase, data] of useCaseMap.entries()) {
          if (data.http) {
            useCaseRequireStatements.push(
              `const ${useCase} = require("./useCases/${useCase}");`
            );

            useCaseClassMethods.push(
              `KohostApiClient.prototype.${useCase} = ${useCase};`
            );

            const { method, path: endpoint } = data.http;

            const pathParams = endpoint.match(/:[a-zA-Z0-9]+/g);

            let codeTemplate = `
        
            /* 
              Creates a method for each use case in the API
              @param {Object} requestData - The options to send to the API
              @param {Object} requestData.headers - The headers to send to the API
              @param {Object} requestData.data - The body to send to the API. Valid for POST and PUT requests
              @parms {Object} requestData.query - The query for the request to build the URL
              @returns {Promise} The response from the API
            */
            
            //eslint-disable-next-line no-inner-declarations
            module.exports = function ${useCase}(requestData = {data: null, query: null, headers: null}, httpConfigOptions = {}) {

            if (!requestData) requestData = {};
            
            // get parameters from path
            const pathParams = ${JSON.stringify(pathParams)}
            
            const { data, query, headers } = requestData;
            
            // replace path parameters with values from params
            let url = "${endpoint}";
            if (pathParams && data) {
              for (const param of pathParams) {
              const paramName = param.replace(":", "");
              url = url.replace(param, data[paramName]);
              }
            }
            
            // make sure all parameters have been replaced
            if (url.match(/:[a-zA-Z0-9]+/g)) {
              const missingParams = url.match(/:[a-zA-Z0-9]+/g);
              // remove the colon from the parameter name
              const missing = missingParams.map((param) => param.replace(":", ""));
              return Promise.reject(
              new Error("Missing parameters: " + missing.join(", "))
              );
            }
            
            const config = {
              method: "${method.toLowerCase()}",
              url: url,
              ...httpConfigOptions,
            };
            
            if (data) config.data = data;
            if (query) config.params = query;
            if (headers) config.headers = headers;
            
            return this._http.request(config);
            }`;

            const bundle = await esbuild.transform(codeTemplate, {
              sourcemap: true,
              loader: "js",
              target: "node16",
              format: "cjs",
            });

            if (!fs.existsSync(path.resolve(__dirname, "../dist/useCases"))) {
              fs.mkdirSync(path.resolve(__dirname, "../dist/useCases"), {
                recursive: true,
              });
            }

            fs.writeFileSync(
              path.resolve(__dirname, `../dist/useCases/${useCase}.js`),
              bundle.code
            );
          }
        }

        // add the require statements to the top of the file
        let file = fileText.replace(
          "/* Add Use Cases Here */",
          useCaseRequireStatements.join("\n")
        );

        // add the use case methods to the class
        file = file.replace(
          "module.exports = KohostApiClient;",
          useCaseClassMethods.join("\n")
        );

        file = file + "\nmodule.exports = KohostApiClient;";

        return {
          contents: file,
          loader: "js",
          resolveDir: path.resolve(__dirname, "../dist"),
        };
      }
    );
  },
};

const entryPoints = [
  { in: path.resolve(__dirname, "../src/Models/"), out: "Models" },
  { in: path.resolve(__dirname, "../src/Errors/"), out: "Errors" },
  { in: path.resolve(__dirname, "../src/Commands/"), out: "Commands" },
  { in: path.resolve(__dirname, "../src/Events/"), out: "Events" },
  { in: path.resolve(__dirname, "../src/utils/"), out: "utils" },
  { in: path.resolve(__dirname, "../src/defs/"), out: "defs" },
];

async function main() {
  const build1 = await esbuild.context({
    entryPoints: entryPoints,
    bundle: true,
    platform: "node",
    packages: "external",
    target: ["node16"],
    outdir: "dist/cjs",
    keepNames: true,
    treeShaking: true,
    allowOverwrite: true,
  });

  const build2 = await esbuild.context({
    entryPoints: entryPoints,
    bundle: true,
    sourcemap: true,
    minify: false,
    keepNames: true,
    format: "esm",
    target: "esnext",
    outdir: "dist/esm",
    define: { global: "window" },
  });

  const build3 = await esbuild.context({
    plugins: [useCasePlugin],
    entryPoints: [path.resolve(__dirname, "../src/Client/")],
    bundle: true,
    sourcemap: true,
    minify: false,
    format: "esm",
    target: "esnext",
    outdir: "dist/esm",
    keepNames: true,
    define: { global: "window" },
  });

  const build4 = await esbuild.context({
    plugins: [useCasePlugin],
    entryPoints: [
      { in: path.resolve(__dirname, "../src/Client/"), out: "Client" },
    ],
    bundle: true,
    platform: "node",
    target: ["node16"],
    format: "cjs",
    outfile: "dist/cjs/Client.js",
    packages: "external",
    keepNames: true,
    allowOverwrite: true,
  });

  const build5 = await esbuild.context({
    plugins: [useCasePlugin],
    entryPoints: [
      { in: path.resolve(__dirname, "../src/Client/"), out: "Client" },
    ],
    bundle: true,
    sourcemap: true,
    minify: false,
    format: "esm",
    target: "esnext",
    outdir: "dist/esm",
    define: { global: "window" },
    keepNames: true,
    allowOverwrite: true,
  });

  const build6 = await esbuild.context({
    entryPoints: [path.resolve(__dirname, "../src/index.js")],
    bundle: false,
    platform: "node",
    packages: "external",
    target: ["node16"],
    outfile: "dist/cjs/index.cjs.js",
    keepNames: true,
    format: "cjs",
  });

  const build7 = await esbuild.context({
    entryPoints: [path.resolve(__dirname, "../src/index.js")],
    bundle: false,
    platform: "node",
    packages: "external",
    target: ["node16"],
    outfile: "dist/cjs/index.cjs.js",
    keepNames: true,
    format: "cjs",
  });

  fs.writeFileSync(
    path.resolve(__dirname, "../dist/esm/index.js"),
    `import Client from "./Client";
    import Commands from "./Commands";
    import Events from "./Events";
    import Models from "./Models";
    import Errors from "./Errors";
    import defs from "./defs";
    import utils from "./utils";
    
    export
     { Client, Commands, Events, Models, Errors, defs, utils };
    `
  );
  const watch = process.argv.includes("--watch");
  if (watch) {
    console.log("Watching for changes...");
    const watcher = async () => {
      await build1.watch();
      await build2.watch();
      await build3.watch();
      await build4.watch();
      await build5.watch();
      await build6.watch();
      await build7.watch();
    };

    watcher();
  } else {
    // run the build
    console.log("building...");
    await build1.rebuild();
    await build2.rebuild();
    await build3.rebuild();
    await build4.rebuild();
    await build5.rebuild();
    await build6.rebuild();
    await build7.rebuild();

    build1.dispose();
    build2.dispose();
    build3.dispose();
    build4.dispose();
    build5.dispose();
    build6.dispose();
    build7.dispose();

    console.log("done");
  }
}

main();
