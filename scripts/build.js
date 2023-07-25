const esbuild = require("esbuild");
const path = require("node:path");
const { promisify } = require("node:util");
const fs = require("node:fs");

const readdirAsync = promisify(fs.readdir);
const statAsync = promisify(fs.stat);
const copyFileAsync = promisify(fs.copyFile);
const mkdirAsync = promisify(fs.mkdir);

const { compileFromFile } = require("json-schema-to-typescript");

const useCases = require("../src/useCases/http.json");
const useCaseMap = new Map(useCases);

if (!fs.existsSync(path.resolve(__dirname, "../dist/cjs"))) {
  fs.mkdirSync(path.resolve(__dirname, "../dist/cjs"), { recursive: true });
}

if (!fs.existsSync(path.resolve(__dirname, "../dist/esm"))) {
  fs.mkdirSync(path.resolve(__dirname, "../dist/esm"), { recursive: true });
}

if (!fs.existsSync(path.resolve(__dirname, "../dist/schemas"))) {
  fs.mkdirSync(path.resolve(__dirname, "../dist/schemas"), { recursive: true });
}

async function copyFilesToDistCjs(srcDir, distCjsDir, ignoredFolders = []) {
  try {
    // Create the dist/cjs directory if it doesn't exist
    if (!fs.existsSync(distCjsDir)) {
      await mkdirAsync(distCjsDir, { recursive: true });
    }

    // Read the contents of the src directory
    const files = await readdirAsync(srcDir);

    // Loop through the files
    for (const file of files) {
      const srcFilePath = path.join(srcDir, file);
      const distCjsFilePath = path.join(distCjsDir, file);

      // Check if the file is a directory
      const isDirectory = (await statAsync(srcFilePath)).isDirectory();

      if (isDirectory) {
        // If it's a directory and not in the ignoredFolders list, copy the directory
        if (!ignoredFolders.includes(file)) {
          await copyFilesToDistCjs(
            srcFilePath,
            distCjsFilePath,
            ignoredFolders
          );
        }
      } else {
        // If it's a file, copy the file
        await copyFileAsync(srcFilePath, distCjsFilePath);
      }
    }
  } catch (err) {
    console.error("Error while copying files:", err);
  }
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
  {
    in: path.resolve(__dirname, "../src/SocketIoClient/"),
    out: "SocketIoClient",
  },
  {
    in: path.resolve(__dirname, "../src/AMQPClient/"),
    out: "AMQPClient",
  },
  { in: path.resolve(__dirname, "../src/Models/"), out: "Models" },
  { in: path.resolve(__dirname, "../src/Errors/"), out: "Errors" },
  { in: path.resolve(__dirname, "../src/Commands/"), out: "Commands" },
  { in: path.resolve(__dirname, "../src/Events/"), out: "Events" },
  { in: path.resolve(__dirname, "../src/utils/"), out: "utils" },
  { in: path.resolve(__dirname, "../src/defs/"), out: "defs" },
];

async function main2() {
  const srcFolder = path.resolve(__dirname, "../src");
  const distCjsFolder = path.resolve(__dirname, "../dist/cjs");
  copyFilesToDistCjs(srcFolder, distCjsFolder, ["useCases", "Client"]);

  let schemas = getAllFilesInDirectory(
    path.resolve(__dirname, "../src/schemas")
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
          path.resolve(__dirname, `../dist/cjs/schemas/${typeNameUpper}.d.ts`),
          ts
        );
      })
      .catch((e) => {
        console.log(schema, e);
      });
  }

  const ESMBuild = await esbuild.context({
    entryPoints: entryPoints.filter((entry) => entry.out !== "AMQPClient"),
    bundle: true,
    sourcemap: true,
    minify: false,
    keepNames: true,
    format: "esm",
    target: "esnext",
    outdir: "dist/esm",
    define: { global: "window" },
  });

  const HttpClientESMBuild = await esbuild.context({
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

  const HttpClientCJSBuild = await esbuild.context({
    plugins: [useCasePlugin],
    entryPoints: [
      { in: path.resolve(__dirname, "../src/Client/"), out: "Client" },
    ],
    bundle: true,
    platform: "node",
    target: ["es2022"],
    format: "cjs",
    outfile: "dist/cjs/Client/index.js",
    packages: "external",
    keepNames: true,
    allowOverwrite: true,
  });

  await HttpClientESMBuild.rebuild();
  await HttpClientCJSBuild.rebuild();
  await ESMBuild.rebuild();

  fs.writeFileSync(
    path.resolve(__dirname, "../dist/esm/index.js"),
    `import ClientBundle from "./Client";
    import SocketIoClientBundle from "./SocketIoClient";
    import CommandsBundle from "./Commands";
    import EventsBundle from "./Events";
    import ModelsBundle from "./Models";
    import ErrorsBundle from "./Errors";
    import defsBundle from "./defs";
    import utilsBundle from "./utils";

    export const Client = ClientBundle;
    export const SocketIoClient = SocketIoClientBundle;
    export const Commands = CommandsBundle;
    export const Events = EventsBundle;
    export const Models = ModelsBundle;
    export const Errors = ErrorsBundle;
    export const defs = defsBundle;
    export const utils = utilsBundle;
    `
  );

  HttpClientESMBuild.dispose();
  HttpClientCJSBuild.dispose();
  ESMBuild.dispose();
}

main2();

//main();
