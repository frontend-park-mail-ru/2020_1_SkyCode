/* eslint-disable */
const path = require('path');

module.exports = {
    entry: './public/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'public'),
    },
    mode: 'development',
    watch: false,

    module: {
        rules: [
            {
                test: /\.hbs$/,
                loader: 'handlebars-loader',
            },

            {
                test: /\.css$/i,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[path][name]__[local]--[hash:base64:5]',
                            },
                            localsConvention: 'dashesOnly',
                            sourceMap: true,
                        },
                    }
                ]
            },
        ],
    },
};
/* eslint-enable */
