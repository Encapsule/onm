// onm v1 webpack.config.js
//
// References: 
//
// https://github.com/petehunt/webpack-howto
// CRITICAL: https://github.com/webpack/webpack/issues/839
// http://christianalfoni.github.io/javascript/2014/12/13/did-you-know-webpack-and-react-is-awesome.html

var outputFilename = 'onm.js'

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

