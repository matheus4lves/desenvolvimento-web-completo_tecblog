const path = require("path");
const { merge } = require("webpack-merge");
// Use a relative path if the module/file is outside `node_modules`
const parts = require("./webpack.parts");

/* "When multiple loaders are chained, it is important to remember that they are executed
in reverse order – either right to left or bottom to top depending on array format."
(Source: https://webpack.js.org/contribute/writing-a-loader/#complex-usage)

"Loaders are evaluated/executed from right to left (or from bottom to top)."
(Source: https://webpack.js.org/concepts/loaders/#configuration)
*/
const postcssPlugins = [
  parts.postcssMixins(),
  parts.postcssNested(),
  parts.postcssSimpleVars(),
  parts.autoprefixer(),
  parts.postcssImport(),
];

const commonConfig = merge([
  {
    context: path.resolve(__dirname, "app"),
    entry: "/assets/scripts/index.js",
    output: {
      path: path.resolve(__dirname, "docs"),
      filename: "bundle.js",
    },
  },
  parts.loadHTML(),
  parts.generateHTML({ template: "/index.html" }),
  parts.loadImages(),
  parts.loadCSS(postcssPlugins),
  parts.devServer(),
]);

const config = {
  development: merge([{ devtool: "eval-source-map" }]),
  production: merge([]),
};

module.exports = (_, argv) => {
  const mode = argv.mode;
  return merge([commonConfig, config[mode], { mode }]);
};
