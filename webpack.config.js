const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const devserver = require('./webpack_modules/devserver');
const babel = require('./webpack_modules/babel');
const cssExtract = require('./webpack_modules/css.extract');
const style = require('./webpack_modules/scss');
const css = require('./webpack_modules/css');
const uglifyJs = require('./webpack_modules/uglify');
const cleanUp = require('clean-webpack-plugin');
const htmlLoader = require('./webpack_modules/html-loader');
const imageLoader = require('./webpack_modules/image-loader');

const PATHS = {
    source: path.join(__dirname, 'src'),
    build: path.join(__dirname, 'build'),
};

const config = merge(
    [{
            entry: {
                app: `${PATHS.source}/main`,
            },
            output: {
                path: PATHS.build,
                filename: 'js/[name].js',
            },
            plugins: [
                new HtmlWebpackPlugin({
                    chunks: ['app'],
                    template: `${PATHS.source}/index.html`,
                }),
                new webpack.optimize.CommonsChunkPlugin({
                    names: ['app'],
                    filename: '[name].js',
                }),
                new webpack.ProvidePlugin({
                    $: 'jquery',
                    jQuery: 'jquery',
                    _: 'underscore',
                }),
                new cleanUp('build'),
            ],
            resolve: {
                modules: ['node_modules'],
                alias: {
                    '@': path.resolve(__dirname, 'src/'),
                    '@styles': path.resolve(__dirname, 'src/scss'),
                    '@sprite': path.resolve(__dirname, 'src/sprite/output'),
                },
            },
        },
        htmlLoader(),
        imageLoader(),
        babel(),
    ]);

module.exports = function (env) {
    if (env === 'production') {
        return merge([
            config,
            cssExtract(),
            uglifyJs(),
        ]);
    }
    if (env === 'development') {
        config.devtool = 'source-map';
        return merge([{},
            config,
            devserver(),
            style(),
            css(),
        ]);
    }
};