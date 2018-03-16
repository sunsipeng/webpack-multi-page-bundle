'use strict'
const path = require('path')
const config = require('../config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const packageConfig = require('../package.json')
const glob = require('glob')
const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')

exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: false }),
    scss: generateLoaders('sass', { indentedSyntax: false }),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options)

  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }

  return output
}

exports.createNotifierCallback = () => {
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}


var htmls = glob.sync('./src/pages/**/*.html');
exports.findJSFilesByHTML = () => {
  var multiEntries = {};
  htmls.forEach(file => {
    let splitNames = file.split('/');
    let htmlName = /.*\/(pages\/.*?)\.html/.exec(file)[1];
    let fileName = splitNames[splitNames.length - 1].split('.')[0];
    let filePath = splitNames;
        filePath.pop();
    let jsFilePath = `${filePath.join('/')}/${fileName}.js`;
    let isExists = fs.existsSync(jsFilePath);
    let terminalName = htmlName.split('/')[1] + '_';
    if(isExists){
      multiEntries[
        `${config.build.multiPeer ? terminalName : ''}${filePath[filePath.length - 1]}_${fileName}`
      ] = jsFilePath;
    }
  });
  return multiEntries;
}


exports.generateHtml = ()=> {
  var htmlPluginRule = [];

  htmls.forEach((file, index) => {
    let htmlName = /.*\/(pages\/.*?)\.html/.exec(file)[1];
    let splitNames = file.split('/');
    let fileName = splitNames[splitNames.length - 1].split('.')[0];
    let filePath = splitNames;
        filePath.pop();
    let jsFilePath = `${filePath.join('/')}/${fileName}.js`;
    let isExists = fs.existsSync(jsFilePath);


    let terminalName = htmlName.split('/')[1] + '_';
    if(isExists){
      var plugin = new HtmlWebpackPlugin({
          filename: `${htmlName}.html`,
          template: file,
          chunks: ['manifest', 'vendor', 'app',
          `${config.build.multiPeer ? terminalName : ''}${filePath[filePath.length - 1]}_${fileName}`],
          minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true
          },
          chunksSortMode: 'dependency',
          inject: true
      });
      htmlPluginRule.push(plugin);
    }
  });
  return htmlPluginRule;
}
