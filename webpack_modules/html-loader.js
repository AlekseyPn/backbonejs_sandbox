module.exports = function () {
    return {
        module: {
            rules: [
                {
                    test: /\.html$/,
                    exclude: /node_modules/,
                    loader: 'html-loader',
                    options: {
                        minimize: true
                    }
                }
            ]
        }
    }
}