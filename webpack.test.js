'use strict'
const path = require('path')
const glob = require('glob')
const utils = require('./build/utils')

const generateHtml = () =>{
  var files = glob.sync('./src/pages/**/*.html');
  var htmlPluginRule = [];

  files.forEach((f) => {
    var name = /.*\/(pages\/.*?)\.html/.exec(f)[1];
    // var plugin = new HtmlWebpackPlugin({
    //     filename: Date.now() + '.html',
    //     template: '.' + f,
    //     inject: true
    // });
    // console.log( Date.now() + '.html' );
    console.log( f );
    // console.log( name.split('/')[name.split('/').length-1] );
    // htmlPluginRule.push(plugin);
  });

  return htmlPluginRule;
}

// generateHtml();

// utils.findJSFilesByHTML()
// utils.thirdPartyDepHandle();

module.exports = {
	// mode: "development" || "production",
	entry: {
		pageA: "./pageA",
		pageB: "./pageB",
		pageC: "./pageC"
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /node_modules/,
					chunks: "initial",
					name: "vendor",
					priority: 10,
					enforce: true
				}
			}
		}
	},
	output: {
		path: path.join(__dirname, "dist"),
		filename: "[name].js"
	}
};

