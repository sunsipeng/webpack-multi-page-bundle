const fs = require('fs');
const del = require('del');
const path = require('path');
const rm = require('rimraf');
const isProd = process.env.NODE_ENV === 'production';
const chalk = require('chalk');

var copyFile = function (src, dist) {
  fs.writeFileSync(dist, fs.readFileSync(src));
  console.log(chalk.green('copy index.html to pages dir success.'));
}
var deleteFile = function () {
  let entryFilename = path.join(__dirname, '../src/pages/index.html');
  if(fs.existsSync(entryFilename)){
    rm(entryFilename, err => {
      if (err) throw err;
      console.log(chalk.green('delete index.html success.'));
    });
  }else{
    copyFile('./index.html', './dist/index.html');
    console.log(chalk.green('copy index.html to dist dir success.'));
  };
}
if(isProd){
  deleteFile();
}else{
  copyFile('./index.html', './src/pages/index.html');
}

