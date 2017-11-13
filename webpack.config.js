const ExtractTextPlugin = require("extract-text-webpack-plugin");
const StyleLintPlugin = require("stylelint-webpack-plugin");

module.exports = {
  entry: "./src/javascripts/App.jsx",
  output: {
    filename: "./dist/public/app.js",
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: [
            "style-loader",
          ],
          use: [
            "css-loader?importLoaders=1",
            "postcss-loader",
          ],
        }),
      },
      {
        enforce: "pre",
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
      },
      {
        test: /\.jsx$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        query: {
          presets: ["es2015", "react"],
        },
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin("./dist/public/app.css"),
    new StyleLintPlugin({
      configFile: ".stylelintrc",
      context: "src",
      files: "**/*.css",
      failOnError: false,
      quiet: false,
    }),
  ],
};
