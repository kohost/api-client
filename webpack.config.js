const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = [
  {
    target: "web",
    entry: "./src/client.js",
    resolve: {
      alias: {
        web: "./src/client.js",
      },
    },
    plugins: [
      new webpack.DefinePlugin({
        "process.env.BROWSER": true,
      }),
      new CleanWebpackPlugin(),
    ],
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.js",
      libraryTarget: "umd",
    },
  },
  {
    target: "node",
    entry: "./src/client.js",
    resolve: {
      alias: {
        web: "./src/client.js",
      },
    },
    plugins: [
      new webpack.DefinePlugin({
        "process.env.BROWSER": false,
      }),
      new CleanWebpackPlugin(),
    ],
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.js",
      libraryTarget: "global",
    },
  },
];
