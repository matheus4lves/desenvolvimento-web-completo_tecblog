const webpack = require('webpack')
const path = require('path')
const postcssPlugins = [
  require('autoprefixer'),
  require('postcss-import'),
  require('postcss-mixins'),
  require('postcss-nested'),
  require('postcss-simple-vars')
]

module.exports = {
  mode: 'development',
  entry: './app/assets/scripts/index.js',
  output: {
    path: path.resolve(__dirname, 'docs'),
    filename: 'bundle.js'
  },
  devServer: {
    before: function(app, server) {
      server._watch('./app/**/*.html')
    },
    contentBase: path.join(__dirname, 'app'),
    index: 'index.html',
    host: '0.0.0.0',
    port: 9003,
    useLocalIp: true,
    hot: true,
    open: {
      app: ['/opt/firefox-84.0b4/firefox/firefox', '--private-window']
    }
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        type: 'asset/source'
      },
      {
        // inject images into the bundle
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.css$/i,
        use: ['style-loader', {loader: 'css-loader', options: {url: false}}, {loader: "postcss-loader", options: {postcssOptions: {plugins: postcssPlugins}}}]
      },
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin({}),
  ],
  devtool: 'eval-source-map',
  target: 'web'
}