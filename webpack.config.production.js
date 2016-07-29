import webpack from "webpack";
import ExtractTextPlugin from "extract-text-webpack-plugin";

import baseConfig from "./webpack.config.base";

const config = {
  ...baseConfig,

  devtool: "source-map",

  entry: {
    bundle: "./app/index",
    presentation: "./app/presentation",
    "slide-preview": "./app/slide-preview"
  },

  output: {
    ...baseConfig.output,

    publicPath: "../dist/"
  },

  module: {
    ...baseConfig.module,

    loaders: [
      ...baseConfig.module.loaders,

      {
        test: /\.global\.css$/,
        loader: ExtractTextPlugin.extract(
          "style-loader",
          "css-loader"
        )
      },

      {
        test: /^((?!\.global).)*\.css$/,
        loader: ExtractTextPlugin.extract(
          "style-loader",
          "css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]"
        )
      },

      {
        test: /.svg$/,
        loaders: [
          "raw-loader",
          "image-webpack-loader"
        ]
      }
    ]
  },

  plugins: [
    ...baseConfig.plugins,
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      __DEV__: false,
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false
      }
    }),
    new ExtractTextPlugin("[name].css", { allChunks: false })
  ],

  target: "electron-renderer"
};

export default config;
