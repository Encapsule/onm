// onm v1 webpack.config.js
//
// References: 
//
// https://github.com/petehunt/webpack-howto
// CRITICAL: https://github.com/webpack/webpack/issues/839

var packageMeta = require('./package.json');
var outputFilename = packageMeta.name + "-" + packageMeta.version + "-webpack.js"

var fs = require('fs');
var node_modules = fs.readdirSync('node_modules').filter(function(x) { return x !== '.bin' });

module.exports = {
    entry: {
        main: './index.js'
    },
    target: "node",
    externals: node_modules,
    output: {
        path: './build',
        filename: outputFilename,
        libraryTarget: "commonjs2"
    }
};

