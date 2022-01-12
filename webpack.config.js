const path = require("path");

const serverConfig = {
  target: "node",
  entry: "./src/client.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.node.js",
    libraryTarget: "commonjs2",
  },
};

const clientConfig = {
  target: "web", // <=== can be omitted as default is 'web'
  entry: "./src/client.js",
  resolve: {
    modules: ["node_modules"],
    fallback: {
      http: require.resolve("stream-http"),
      https: require.resolve("https-browserify"),
      stream: require.resolve("stream-browserify"),
      assert: require.resolve("assert/"),
      tty: require.resolve("tty-browserify"),
      util: require.resolve("util/"),
      os: require.resolve("os-browserify/browser"),
      zlib: require.resolve("browserify-zlib"),
    },
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    libraryTarget: "umd",
  },
};

module.exports = [clientConfig, serverConfig];
