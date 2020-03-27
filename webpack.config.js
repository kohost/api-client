const path = require("path");

module.exports = {
  entry: "./src/client.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    library: "@kohost/api-client",
    libraryTarget: "commonjs2",
  },
};
