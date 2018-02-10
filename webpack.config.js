var webpack = require("webpack");
var path = require('path');
var APP_DIR = path.resolve(__dirname, 'app/');
var BUILD_DIR = path.resolve(__dirname, 'dist/');

module.exports = {
	entry: APP_DIR + "/app.js",
    output: {
        path: BUILD_DIR,
        filename: "bundle.js",
    },
    devtool: 'source-map',
    devServer: {
	  contentBase: BUILD_DIR,
	  compress: true,
	  port: 3000
	},
    module:{
		loaders : [
			{
				test : /\.jsx?/,
				include : APP_DIR,
				loader : 'babel-loader'
			}
		]
    }
}
