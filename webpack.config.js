const path = require("path");

const serverConfig = {
  target: 'node',
  entry: "./src/client.js",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "bundle.js",
    library: "@kohost/api-client",
    libraryTarget: "commonjs2",
  }
};

const clientConfig = {
  target: 'web', // <=== can be omitted as default is 'web'
  entry: "./src/client.js",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "bundle.js",
    library: "@kohost/api-client",
    libraryTarget: "commonjs2",
  }
};

module.exports = [ serverConfig, clientConfig ];
