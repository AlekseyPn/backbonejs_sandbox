module.exports = function () {
    return {
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        query: {
                            presets: ['env'],
                            compact: false
                        }
                    }
                }
            ]
        }
    }    
}