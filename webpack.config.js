const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
// const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: path.resolve(__dirname, "./src/js/Main.js"), 
  devtool: "inline-source-map",
  output: {
    path: path.resolve(__dirname, "./Turkish_Runner"),
    filename: "bundle.js",
    // publicPath: "bharat",
    clean: true,
  },
  devServer: {
    hot: true,
    host: "0.0.0.0",
    port: 1808,
    static: {
      directory: path.join(__dirname, "src"),
    },
  },
  target: "web",
  mode: "development",
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      inject: true,
    }),
    new CopyPlugin({
      patterns: [
        { from: "src/assets", to: "assets" },
        {
          from: "src/styles.css",
          to: path.resolve(__dirname, "./Turkish_Runner"),
        },
      ],
    }),
    new MiniCSSExtractPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    // new Dotenv(),
  ],
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
      // {
      //   test: /\.css$/,
      //   use: [ "css-loader"],
      // },
    ],
  },
};
