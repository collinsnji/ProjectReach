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
        path: path.resolve(__dirname, 'public/dist/src'),
        filename: '[name].js'
    },
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    target: 'web'
};