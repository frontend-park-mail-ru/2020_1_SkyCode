/* eslint-disable */
const path = require('path');

module.exports = {
    entry: './public/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'public'),
    },
    mode: 'production',

    module: {
        rules: [
            {
                test: /\.hbs$/,
                loader: 'handlebars-loader',
            }
        ]
    }
};
/* eslint-enable */
