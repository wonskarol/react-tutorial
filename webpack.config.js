var webpack = require('webpack');

module.exports = {
    devtool: 'eval-source-map',
    entry:  __dirname + "/src/index.js",
    output: {
        path: __dirname + "/public/dist",
        publicPath: "/dist",
        filename: "bundle.js"
    },

    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel'
            },
            {
                test: /\.json$/,
                exclude: /node_modules/,
                loader: 'json'
            }
        ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],

    devServer: {
        contentBase: "./public",
        colors: true,
        historyApiFallback: true,
        inline: true,
        hot: true
    }
};


