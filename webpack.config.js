var webpack = require("webpack");

module.exports = {
	entry: __dirname + "/app/app.js",
    output: {
        path: __dirname + "/public/scripts",
        filename: "bundle.js",
    }
}
