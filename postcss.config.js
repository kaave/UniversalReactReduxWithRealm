module.exports = ctx => ({
  plugins: {
    'postcss-import': {},
    'postcss-custom-properties': {},
    'postcss-custom-media': {},
    'postcss-nested': {},
    'postcss-fixes': {},
    autoprefixer: {},
    cssnano: ctx.env === 'production' ? {} : false
  }
});

