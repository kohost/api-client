const esbuild = require("esbuild");
const path = require("node:path");
const fs = require("node:fs");

const { compileFromFile } = require("json-schema-to-typescript");

const useCases = require("../src/useCases/http.json");
const useCaseMap = new Map(useCases);

if (!fs.existsSync(path.resolve(__dirname, "../dist/cjs"))) {
  fs.mkdirSync(path.resolve(__dirname, "../dist/cjs"), {
    recursive: true,
  });
}

if (!fs.existsSync(path.resolve(__dirname, "../dist/esm"))) {
  fs.mkdirSync(path.resolve(__dirname, "../dist/esm"), { recursive: true });
}

if (!fs.existsSync(path.resolve(__dirname, "../dist/types/schemas"))) {
  fs.mkdirSync(path.resolve(__dirname, "../dist/types/schemas"), {
    recursive: true,
  });
}

function getAllFilesInDirectory(dirPath) {
  const files = [];

  function readFilesRecursively(directory) {
    const entries = fs.readdirSync(directory, { withFileTypes: true });

    entries.forEach((entry) => {
      const entryPath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        readFilesRecursively(entryPath); // Recursively read subdirectories
      } else if (entry.isFile() && entry.name.endsWith(".json")) {
        const relativePath = path.relative(dirPath, entryPath);
        files.push(relativePath); // Add relative file path to the files array if it's a JSON file
      }
    });
  }

  readFilesRecursively(dirPath);

  return files;
}
function attachUseCases(format) {
  const useCasePlugin = {
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
                `import { ${useCase} } from "./useCases/${useCase}";`,
              );

              useCaseClassMethods.push(
                `KohostApiClient.prototype.${useCase} = ${useCase};`,
              );

              const { method, path: endpoint } = data.http;

              const pathParams = endpoint.match(/:[a-zA-Z0-9]+/g);

              let codeTemplate = `
        
            /* 
              Creates a method for each use case in the API
              @memberof KohostApiClient
              @param {Object} requestData - The options to send to the API
              @param {Object} requestData.headers - The headers to send to the API
              @param {Object} requestData.data - The body to send to the API. Valid for POST and PUT requests
              @parms {Object} requestData.query - The query for the request to build the URL
              @returns {Promise} The response from the API
            */
            
            //eslint-disable-next-line no-inner-declarations
            export function ${useCase}(requestData = {data: null, query: null, headers: null}, httpConfigOptions = {}) {

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

              if (format === "esm") {
                const esmBundle = await esbuild.transform(codeTemplate, {
                  sourcemap: true,
                  loader: "js",
                  target: "node18",
                  format: "esm",
                });

                if (
                  !fs.existsSync(
                    path.resolve(__dirname, "../dist/esm/useCases"),
                  )
                ) {
                  fs.mkdirSync(
                    path.resolve(__dirname, "../dist/esm/useCases"),
                    {
                      recursive: true,
                    },
                  );
                }
                fs.writeFileSync(
                  path.resolve(__dirname, `../dist/esm/useCases/${useCase}.js`),
                  esmBundle.code,
                );
              } else if (format === "cjs") {
                const cjsBundle = await esbuild.transform(codeTemplate, {
                  sourcemap: true,
                  loader: "js",
                  target: "node18",
                  format: "cjs",
                });

                if (
                  !fs.existsSync(
                    path.resolve(__dirname, "../dist/cjs/useCases"),
                  )
                ) {
                  fs.mkdirSync(
                    path.resolve(__dirname, "../dist/cjs/useCases"),
                    {
                      recursive: true,
                    },
                  );
                }

                fs.writeFileSync(
                  path.resolve(__dirname, `../dist/cjs/useCases/${useCase}.js`),
                  cjsBundle.code,
                );
              }
            }
          }

          // add the require statements to the top of the file
          let file = fileText.replace(
            "/* Add Use Cases Here */",
            useCaseRequireStatements.join("\n"),
          );

          // add the use case methods to the class
          file = file.replace(
            "/* Add Prototype here */",
            useCaseClassMethods.join("\n"),
          );

          return {
            contents: file,
            loader: "js",
            resolveDir: path.resolve(__dirname, `../dist/${format}`),
          };
        },
      );
    },
  };

  return useCasePlugin;
}

const entryPoints = [
  { in: path.resolve(__dirname, "../src/index.js"), out: "index" },
  // {
  //   in: path.resolve(__dirname, "../src/Client/"), out: "Client" },
  // {
  //   in: path.resolve(__dirname, "../src/SocketIoClient/"),
  //   out: "SocketIoClient",
  // },
  // {
  //   in: path.resolve(__dirname, "../src/AMQPClient/"),
  //   out: "AMQPClient",
  // },
  // { in: path.resolve(__dirname, "../src/Models/"), out: "Models" },
  // { in: path.resolve(__dirname, "../src/Errors/"), out: "Errors" },
  // { in: path.resolve(__dirname, "../src/Commands/"), out: "Commands" },
  // { in: path.resolve(__dirname, "../src/Events/"), out: "Events" },
  // { in: path.resolve(__dirname, "../src/utils/"), out: "utils" },
  // { in: path.resolve(__dirname, "../src/defs/"), out: "defs" },
];

async function build() {
  let schemas = getAllFilesInDirectory(
    path.resolve(__dirname, "../src/schemas"),
  );

  // compile each schema to a typescript interface
  for (const schema of schemas) {
    const schemaPath = path.resolve(__dirname, `../src/schemas/${schema}`);
    compileFromFile(schemaPath, {
      cwd: path.resolve(__dirname, "../src/schemas"),
    })
      .then((ts) => {
        // replace .json with .d.ts and remove any parent directory
        const typeName = schema.replace(".json", "").split("/").pop();
        const typeNameUpper =
          typeName.charAt(0).toUpperCase() + typeName.slice(1) + "Schema";
        fs.writeFileSync(
          path.resolve(
            __dirname,
            `../dist/types/schemas/${typeNameUpper}.d.ts`,
          ),
          ts,
        );
      })
      .catch((e) => {
        console.log(schema, e);
      });
  }

  // NODE
  await esbuild.build({
    entryPoints: entryPoints,
    plugins: [attachUseCases("esm")],
    bundle: true,
    sourcemap: true,
    minify: false,
    keepNames: true,
    format: "esm",
    target: "esnext",
    platform: "node",
    outdir: "dist/esm",
    define: { global: "window" },
  });

  await esbuild.build({
    entryPoints: entryPoints,
    plugins: [attachUseCases("cjs")],
    bundle: true,
    sourcemap: true,
    minify: false,
    keepNames: true,
    format: "cjs",
    target: "esnext",
    platform: "node",
    outdir: "dist/cjs",
    define: { global: "window" },
  });

  // const HttpClientESMBuild = await esbuild.build({
  //   plugins: [useCasePlugin],
  //   entryPoints: [
  //     { in: path.resolve(__dirname, "../src/Client/"), out: "Client" },
  //   ],
  //   bundle: true,
  //   sourcemap: true,
  //   minify: false,
  //   format: "esm",
  //   target: "esnext",
  //   platform: "node",
  //   outdir: "dist/esm",
  //   keepNames: true,
  //   define: { global: "window" },
  // });

  // const HttpClientCJSBuild = await esbuild.build({
  //   plugins: [useCasePlugin],
  //   entryPoints: [
  //     { in: path.resolve(__dirname, "../src/Client/"), out: "Client" },
  //   ],
  //   bundle: true,
  //   platform: "node",
  //   target: ["es2022"],
  //   format: "cjs",
  //   packages: "external",
  //   keepNames: true,
  //   allowOverwrite: true,
  // });
}

build();
