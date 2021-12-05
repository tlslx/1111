require('./check-versions')();

// process.env.NODE_ENV = 'production'
const serverWebpackConfig = require('./webpack.server.conf');

var ora = require('ora');
var rm = require('rimraf');
var path = require('path');
var chalk = require('chalk');
var webpack = require('webpack');
var config = require('../config');
var webpackConfig = require('./webpack.prod.conf');

// var spinner = ora('building for production...');
var spinner = ora('building for ' + process.env.NODE_ENV + ' of ' + process.env.env_config+ ' mode...' );
spinner.start();

function buildFrontPage() {
  return new Promise((resolve, reject) => {
    webpack(webpackConfig, (err, stats) => {
      spinner.stop();
      if (err) throw err;
      process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + '\n\n');
      if (stats.hasErrors()) {
        console.log(chalk.red('  Build failed with errors.\n'))
        process.exit(1);
      }
      resolve('success');
    });
  });
}

function buildServerJs() {
  return new Promise((resolve, reject) => {
    console.log(chalk.cyan('  请稍等，将编译服务执行文件.\n'));
    webpack(serverWebpackConfig, (err, stats) => {
      spinner.stop();
      if (err) throw err;
      process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + '\n\n');
      if (stats.hasErrors()) {
        console.log(chalk.red('  编译生成服务执行文件错误.\n'))
        process.exit(1);
      }
      console.log(chalk.cyan('  编译完成.\n'));
      resolve("success");
    });

  });
}

// rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
//   if (err) throw err;
//   webpack(webpackConfig, function (err, stats) {
//     spinner.stop();
//     if (err) throw err;
//     process.stdout.write(stats.toString({
//       colors: true,
//       modules: false,
//       children: false,
//       chunks: false,
//       chunkModules: false
//     }) + '\n\n');

//     if (stats.hasErrors()) {
//       console.log(chalk.red('  Build failed with errors.\n'));
//       process.exit(1);
//     }

//     console.log(chalk.cyan('  Build complete.\n'));
//     console.log(chalk.yellow(
//       '  Tip: built files are meant to be served over an HTTP server.\n' +
//       '  Opening index.html over file:// won\'t work.\n'
//     ));
//   });
// });

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err;
  buildFrontPage().then(() => {
  buildServerJs();
  });
});
