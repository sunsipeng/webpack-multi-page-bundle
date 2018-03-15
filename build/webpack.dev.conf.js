'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
const glob = require('glob')
const path = require('path')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const generateEntry = ()=> {
  var moduleNames = [];
  var files = glob.sync('./src/pages/**/index.js');
  files.forEach(function(f){
    var name = /.*\/(pages\/.*?\/index)\.js/.exec(f)[1];
    var moduleName = name.split('/')[name.split('/').length-2];
    moduleNames.push( moduleName );
  });
  return moduleNames;
}

// 生成HTML文件
const generateHtml = ()=> {
  var files = glob.sync('./src/pages/**/*.html');
  var htmlPluginRule = [];

  files.forEach((f, index) => {
    var name = /.*\/(pages\/.*?)\.html/.exec(f)[1];
    var plugin = new HtmlWebpackPlugin({
        filename: name.split('/')[name.split('/').length-1] + '.html',
        template: f,
        chunks: ['manifest', 'vendor', 'app', generateEntry()[index]],
        inject: true
    });
    htmlPluginRule.push(plugin);
  });

  return htmlPluginRule;
}

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: true,
    hot: true,
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    ...generateHtml()
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      devWebpackConfig.devServer = {
        contentBase: path.join(__dirname, "../src/")
      }

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
