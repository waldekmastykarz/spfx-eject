const set_webpack_public_path_plugin_1 = require("@microsoft/set-webpack-public-path-plugin");
const webpack = require('webpack');
const fileLoaderExts = ['jpg', 'png', 'woff', 'eot', 'ttf', 'svg', 'gif', 'dds']
const lodash = require("lodash");

module.exports = {
  module: {
    rules: [
      {
        use: [
          {
            loader: require.resolve('@microsoft/loader-load-themed-styles'),
            options: {
              async: true
            }
          },
          {
            loader: require.resolve('css-loader')
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              ident: 'postcss',
              minimize: true,
              plugins: [
                require('cssnano')({ preset: 'default' })
              ]
            }
          }
        ],
        test: /\.css$/
      },
      {
        use: [
          {
            loader: require.resolve('@microsoft/loader-cased-file'),
            options: {
              name: '[name:lower]_[hash].[ext]'
            }
          }
        ],
        test: new RegExp(`\.(${fileLoaderExts.map((e) => lodash.escapeRegExp(e)).join('|')})((\\?|\\#).+)?$`)
      },
      {
        use: [
          {
            loader: require.resolve('html-loader')
          }
        ],
        test: /\.html$/
      }
    ],
    noParse: [/\.map$/]
  },
  resolve: {
    alias: {},
    modules: [
      'node_modules'
    ]
  },
  "context": "/Users/waldek/github/waldekmastykarz/spfx-eject",
  "devtool": "source-map",
  "mode": "development",
  "entry": {
    "hello-world-web-part": "/Users/waldek/github/waldekmastykarz/spfx-eject/lib/webparts/helloWorld/HelloWorldWebPart.js"
  },
  "externals": [
    "@microsoft/sp-lodash-subset",
    "@microsoft/sp-core-library",
    "@microsoft/decorators",
    "@microsoft/office-ui-fabric-react-bundle",
    "@microsoft/sp-diagnostics",
    "@microsoft/sp-dynamic-data",
    "@microsoft/sp-polyfills",
    "@microsoft/sp-http",
    "@microsoft/sp-page-context",
    "@microsoft/sp-loader",
    "@microsoft/sp-component-base",
    "@microsoft/sp-property-pane",
    "@microsoft/sp-webpart-base",
    "@microsoft/sp-office-ui-fabric-core",
    "spfx-eject",
    "react",
    "react-dom",
    "HelloWorldWebPartStrings"
  ],
  "output": {
    "hashFunction": "md5",
    "chunkFilename": "chunk.[name]_[contenthash].js",
    "filename": "[name].js",
    "library": "69cde90f-8d69-4ddd-9000-a9ecd2ffd5ca_0.0.1",
    "libraryTarget": "amd",
    "path": "/Users/waldek/github/waldekmastykarz/spfx-eject/dist",
    "devtoolModuleFilenameTemplate": "webpack:///../[resource-path]",
    "devtoolFallbackModuleFilenameTemplate": "webpack:///../[resource-path]?[hash]"
  },
  "optimization": {
    "moduleIds": "hashed"
  },
  "plugins": [
    new set_webpack_public_path_plugin_1.SetPublicPathPlugin({
      "scriptName": {
        "name": "\\/[name](_[a-z0-9-]+)*\\\\.js",
        "isTokenized": true
      }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(false ? 'production' : 'dev'),
      DEBUG: true,
      DEPRECATED_UNIT_TEST: false,
      DATACENTER: true
    })
  ]
};