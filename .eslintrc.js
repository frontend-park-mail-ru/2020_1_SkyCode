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
        'no-await-in-loop':         ['error'],
        // codestyle
        'indent':                   ['error', 4],
        'linebreak-style':          ['error', 'unix'],
        'quotes':                   ['error', 'single'],
        'semi':                     ['error', 'always'],
        'array-bracket-newline':    ['error', 'consistent'],
        'array-element-newline':    ['error', 'consistent'],
        'block-spacing':            ['error', 'always'],
        'brace-style':              ['error', '1tbs'],
        'camelcase':                ['error'],
        'capitalized-comments':     ['error', 'always'],
        'comma-dangle':             ['error', 'always-multiline'],
        'comma-spacing':            ['error'],
        'comma-style':              ['error', 'last'],
        'computed-property-spacing':['error'],
        'consistent-this':          ['error', 'that'],
        'eol-last':                 ['error', 'always'],
        'func-call-spacing':        ['error'],
        'function-call-argument-newline':   ['error', 'consistent'],
        'key-spacing':              ['error'],
        'space-before-function-paren': ['error', {
            'anonymous': 'never',
            'named': 'never',
            'asyncArrow': 'always',
        }],
        'keyword-spacing':          ['error', {
            'before': true,
            'after': true,
        }],
        'lines-between-class-members': ['error', 'always'],
        'max-depth':                ['error', 3],
        'max-length':               ['error', {
            'code': 80,
        }],
        'multiline-comment-style':  ['error', 'starred-block'],
        'new-cap':                  ['error'],
        'new-parens':               ['error', 'always'],
        'newline-per-chained-call': ['error', {
            'ignoreChainWithDepth': 2,
        }],
        'no-array-constructor':     ['error'],
        'no-inline-comments':       ['error'],
        'no-lonely-if':             ['error'],
        'no-mixed-operators':       ['error'],
        'no-multiple-empty-lines':  ['error', {
            'max': 2,
            'maxEOF': 1,
            'maxBOF': 0,
        }],
        'no-negated-condition':     ['error'],
        'no-nested-ternary':        ['error'],
        'no-new-object':            ['error'],
        'no-tabs':                  ['error'],
        'no-trailing-spaces':       ['error'],
        'no-unneeded-ternary':      ['error'],
        'no-whitespace-before-property':    ['error'],
        'object-curly-spacing':     ['error'],
        'object-property-newline':  ['error'],
        'operator-assignment':      ['error', 'always'],
        'operator-linebreak':       ['error', 'none'],
        'padded-blocks':            ['error', 'never'],
        'prefer-exponentiation-operator':   ['error'],
        'quote-props':              ['error', 'as-needed'],
        'semi-spacing':             ['error'],
        'semi-style':               ['error'],
        // 'sort-keys':                ['warn'],
        'space-before-blocks':      ['error'],
        'space-in-parens':          ['error'],
        'space-infix-ops': ['error', {
            'int32Hint': true,
        }],
        'space-unary-ops':          ['error'],
        // 'spaced-comment': ['error', 'always', {
        //     'line': {
        //         'markers': ['/'],
        //         'exceptions': ['-', '+'],
        //     },
        //     'block': {
        //         'markers': ['!'],
        //         'exceptions': ['*'],
        //         'balanced': true,
        //     },
        // }],
        'switch-colon-spacing':     ['error'],
        'template-tag-spacing':     ['error'],
        'wrap-regex':               ['error'],
        'arrow-body-style':         ['error', 'as-needed'],
        'arrow-parens':             ['error'],
        'arrow-spacing':            ['error'],
        'generator-star-spacing':   ['error'],
        'no-confusing-arrow':       ['error'],
        'no-duplicate-imports':     ['error'],
        'no-useless-computed-key':  ['error', {
            'enforceForClassMembers': true,
        }],
        'no-useless-constructor':   ['error'],
        'no-useless-rename':        ['error'],
        'no-var':                   ['error'],
        'object-shorthand':         ['error', 'always'],
        'prefer-arrow-callback':    ['error'],
        'prefer-const':             ['error'],

    },
    'reportUnusedDisableDirectives': true,
};