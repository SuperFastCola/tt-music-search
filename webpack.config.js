var version = "?v=1.0";

var webpack = require("webpack");
var path = require('path');
var APP_DIR = path.resolve(__dirname, 'app/');
var BUILD_DIR = path.resolve(__dirname, 'dist/');
var MODULE_DIR = path.resolve(APP_DIR, 'modules/');
var SASS_DIR = path.resolve(APP_DIR, 'sass/');
var TEMPLATE_DIR = path.resolve(APP_DIR, 'templates/');

var UglifyJsPlugin = require('uglifyjs-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var cssFiles = 'app.bundle.css' + version;
var extractCSS = new ExtractTextPlugin({filename:cssFiles});

var ugilfy = new UglifyJsPlugin({
    uglifyOptions: {
        compress: true
    }
});


var assembleHTML = new HtmlWebpackPlugin({
    title:"Spotify and React",
    template: TEMPLATE_DIR + '/boilerplate.html'
});

var StylesArray = [];
StylesArray.push({loader: "css-loader", options: { minimize: true } });
StylesArray.push({loader: "sass-loader",options: {includePaths: [SASS_DIR]}});

module.exports = {
	entry: APP_DIR + "/app.js",
    output: {
        path: BUILD_DIR,
        filename: "bundle.js",
    },
    resolve: {
    	alias: { 
    		jquery: MODULE_DIR + "/jquery-3.3.1.min.js",
    		styles: SASS_DIR + "/styles.scss"
    	}
    },
    devtool: 'source-map',
    devServer: {
	  contentBase: BUILD_DIR,
	  compress: true,
	  port: 3000
	},
	//https://medium.com/a-beginners-guide-for-webpack-2/using-sass-9f52e447c5ae
	//https://medium.com/a-beginners-guide-for-webpack-2/extract-text-plugin-668e7cd5f551
	 module: {
        rules: [
        	{
				test : /\.jsx?/,
				include : APP_DIR,
				loader : 'babel-loader'
			},
        	{
            	test: /\.scss$/,
            	use: extractCSS.extract({
            		fallback:'style-loader',
            		 use: StylesArray
            	})
        	}
        ]
    },
     plugins: [
        extractCSS,
        assembleHTML,
        ugilfy
    ]
}
