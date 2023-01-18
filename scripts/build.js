const esbuild = require("esbuild");
const path = require("node:path");
const fs = require("node:fs");
const useCases = require("../src/useCases/http.json");
const useCaseMap = new Map(useCases);

let useCasePlugin = {
  name: "useCasePlugin",
  setup(build) {
    build.onLoad(
      { filter: /src\/http\/index.js/, namespace: "file" },
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
              @param {Object} options - The options to send to the API
              @param {Object} options.headers - The headers to send to the API
              @param {Object} options.data - The body to send to the API. Valid for POST and PUT requests
              @parms {Object} options.query - The query for the request to build the URL
              @returns {Promise} The response from the API
            */
            
            //eslint-disable-next-line no-inner-declarations
            module.exports = function ${useCase}(requestData, options = {}) {
            if (!this._init) {
              // wait a second for the client to initialize
              return new Promise((resolve) => {
              setTimeout(() => {
                resolve(${useCase}.call(this, requestData));
              }, 500);
              });
            }
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
              ...options,
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

esbuild.build({
  entryPoints: [
    path.resolve(__dirname, "../src/models/"),
    path.resolve(__dirname, "../src/errors/"),
    path.resolve(__dirname, "../src/commands/"),
    path.resolve(__dirname, "../src/events/"),
    path.resolve(__dirname, "../src/utils/"),
    path.resolve(__dirname, "../src/defs/"),
  ],
  bundle: true,
  platform: "node",
  packages: "external",
  target: ["node16"],
  outdir: "dist",
  treeShaking: true,
  allowOverwrite: true,
});

esbuild.build({
  plugins: [useCasePlugin],
  entryPoints: [path.resolve(__dirname, "../src/http/")],
  bundle: true,
  platform: "node",
  target: ["node16"],
  format: "cjs",
  outfile: "dist/Client.js",
  allowOverwrite: true,
});
