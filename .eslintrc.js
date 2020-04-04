module.exports = {
    'extends': 'eslint:recommended',
    'env': {
        'browser': true,
        'es6': true,
        'es2020': true,
    },
    'globals': {
        'Atomics': 'readonly',
        'SharedArrayBuffer': 'readonly'
    },
    'parserOptions': {
        'ecmaVersion': 2020,
        'sourceType': 'module',
        'ecmaFeatures': {
            impliedStrict: true,
        }
    },
    'rules': {
        'indent':           ['error', 4],
        'linebreak-style':  ['error', 'unix'],
        'quotes':           ['error', 'single'],
        'semi':             ['error', 'always'],
        'no-await-in-loop': ['warn'],
    },
    "reportUnusedDisableDirectives": true,
};