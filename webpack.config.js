// const path = require("path");
// const webpack = require("webpack");

module.exports = {
  mode: "development",
  entry: "./src/client/index.ts",
  devtool: "inline-source-map",
  output: {
    filename: "index.js",
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [{ loader: "ts-loader" }],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".js", ".ts"]
  }
};
