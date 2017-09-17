module.exports = {
  extends: ['stylelint-config-standard'],
  ignoreFiles: [
    'node_modules/**/*'
  ],
  rules: {
    /*
     * Manual
     */
    // コメント記号とコメント本文の間にスペースを共用する 無効化 IntelliJと相性が悪い
    'comment-whitespace-inside': null,

    /*
     * ECSS basic rules
     */
    'block-no-empty': true,
    'color-no-invalid-hex': true,
    'declaration-colon-space-after': 'always',
    'declaration-colon-space-before': 'never',
    'function-comma-space-after': 'always',
    'function-url-quotes': 'always',
    'media-feature-colon-space-after': 'always',
    'media-feature-colon-space-before': 'never',
    'media-feature-name-no-vendor-prefix': true,
    'max-empty-lines': 2,
    'number-leading-zero': 'always',
    'number-no-trailing-zeros': true,
    'property-no-vendor-prefix': true,
    'declaration-block-no-duplicate-properties': true,
    'block-opening-brace-newline-after': 'always',
    'block-closing-brace-newline-before': 'always',
    'declaration-block-trailing-semicolon': 'always',
    'selector-list-comma-newline-after': 'always-multi-line',
    'selector-max-id': 0,
    'string-quotes': 'double',
    'value-no-vendor-prefix': true,
    'function-linear-gradient-no-nonstandard-direction': true,
    'selector-max-universal': 0,
    'declaration-block-no-shorthand-property-overrides': true,
    indentation: 4,
    'selector-max-specificity': '0,2,0'
  }
};
