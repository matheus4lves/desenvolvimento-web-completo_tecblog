const HtmlWebpackPlugin = require("html-webpack-plugin");

/* Keep in mind that loadHTML(), loadImages() and generateHTML() must be used together.
Why? loadHTML() will convert loadable attributes (src, href, and so on) into
require/import, which JavaScript can understand. Then, loadImages() will make
webpack able to handle images, and generateHTML() will generate the final
index.html file based on the template you provide. */
exports.loadHTML = () => ({
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
    ],
  },
});

exports.loadImages = () => ({
  module: {
    rules: [
      {
        // inject images into the bundle
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
});

exports.generateHTML = ({ template } = {}) => ({
  plugins: [new HtmlWebpackPlugin({ template })],
});

exports.loadCSS = () => ({
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: postcssPlugins,
              },
            },
          },
        ],
      },
    ],
  },
});

exports.loadCSS = (postcssPlugins = []) => ({
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader", ...postcssPlugins],
      },
    ],
  },
});

exports.devServer = () => ({
  devServer: {
    hot: false,
  },
});

// PostCSS plugins
exports.postcssImport = () => ({
  loader: "postcss-loader",
  options: {
    postcssOptions: {
      plugins: [require("postcss-import")],
    },
  },
});

exports.autoprefixer = () => ({
  loader: "postcss-loader",
  options: {
    postcssOptions: {
      plugins: [require("autoprefixer")],
    },
  },
});

exports.postcssMixins = () => ({
  loader: "postcss-loader",
  options: {
    postcssOptions: {
      plugins: [require("postcss-mixins")],
    },
  },
});

exports.postcssNested = () => ({
  loader: "postcss-loader",
  options: {
    postcssOptions: {
      plugins: [require("postcss-nested")],
    },
  },
});

exports.postcssSimpleVars = () => ({
  loader: "postcss-loader",
  options: {
    postcssOptions: {
      plugins: [require("postcss-simple-vars")],
    },
  },
});
