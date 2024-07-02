const path = require("path");

module.exports = {
  mode: "development",
  target: ["web", "es2020"],

  entry: {
    bundle_index: path.resolve(__dirname, "app/src/js/index.js"),
    bundle_login: path.resolve(__dirname, "app/src/js/login.js"),
    bundle_signup: path.resolve(__dirname, "app/src/js/signup.js"),
    bundle_dashboard: path.resolve(__dirname, "app/src/js/dashboard.js"),
    bundle_account: path.resolve(__dirname, "app/src/js/account.js"),
  },

  devtool: "source-map",

  output: {
    path: path.resolve(__dirname, "app/public"),
    filename: "[name].js",
    assetModuleFilename: "[name][ext]",
  },

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(ttf)$/i,
        type: "asset/resource",
      },
    ],
  },
};
