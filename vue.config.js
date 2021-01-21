/* eslint-disable */
const StyleLintPlugin = require('stylelint-webpack-plugin')

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  lintOnSave: false,
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "@/assets/styles/global.scss";'
      }
    }
  },
  configureWebpack: {
    plugins: [
      new StyleLintPlugin({
        files: ['**/*.{vue,scss}'],
        fix: true
      })
    ]
  },
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg');
    svgRule.uses.clear();
    svgRule
      .use('html-loader')
      .loader('html-loader')
  },
}
