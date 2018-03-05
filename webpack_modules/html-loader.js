module.exports = function () {
    return {
        module: {
            rules: [
                {
                    test: /\.html$/,
                    exclude: /node_modules/,
                    loader: 'mustache-loader',
                    options: {
                        minimize: true
                    }
                }
            ]
        }
    }
}