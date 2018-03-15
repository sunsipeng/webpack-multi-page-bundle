'use strict'
const path = require('path')
const glob = require('glob')


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

generateHtml();
