const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './src/FreshdeskWidget.js',
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/
            },
            {
                test: /\.css?$/,
                loaders: [ 'style', 'raw' ],
                include: path.resolve(__dirname, '../')
            }
        ]
    },

    externals: {
        'react': 'react',
        'react-dom': 'ReactDOM'
    },

    output: {
        filename: 'dist/react-freshdesk-widget.js',
        libraryTarget: 'umd'
    },

    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurrenceOrderPlugin()
    ]
}
