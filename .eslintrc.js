// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
  extends: ['plugin:vue/recommended', 'airbnb-base'],
  // required to lint *.vue files
  plugins: [
    'vue',
    'html',
  ],
  // check if imports actually resolve
  settings: {
    'import/resolver': {
      webpack: {
        config: 'build/webpack.base.conf.js',
      }
    }
  },
  // add your custom rules here
  rules: {
    "indent": ["error", 4],
    "max-len": ["off", { "ignoreTemplateLiterals": true, "ignoreStrings": true }],
    "linebreak-style": ["off"],

    "vue/html-indent": ["error", 4, {
        "attribute": 1,
        "closeBracket": 0,
        "alignAttributesVertically": true,
        "ignores": []
    }],
    

    "vue/name-property-casing": ["error", "kebab-case"],

    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      js: 'never',
      vue: 'never'
    }],
    // disallow reassignment of function parameters
    // disallow parameter object manipulation except for specific exclusions
    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: [
        'state', // for vuex state
        'acc', // for reduce accumulators
        'e' // for e.returnvalue
      ]
    }],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      optionalDependencies: ['test/unit/index.js']
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
