const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: {
        map: './src/map.js',
        weather: './src/weather.js',
        charity: './src/charity.js',
        main: './src/main.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist/src'),
        filename: '[name].js'
    },
    node: {
        fs: 'empty'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    target: 'web',
    externals: {
        'request': 'request'
    }
};