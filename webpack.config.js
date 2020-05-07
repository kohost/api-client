const path = require("path");

const serverConfig = {
  target: "node",
  entry: "./src/client.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    libraryTarget: "commonjs2",
  },
};

const clientConfig = {
  target: "web", // <=== can be omitted as default is 'web'
  entry: "./src/client.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    libraryTarget: "umd",
  },
};

module.exports = [serverConfig, clientConfig];
