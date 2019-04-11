const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const merge = require('webpack-merge')
const base = require('../webpack.config')

module.exports = merge.strategy({
  externals: "replace"
})(base, {
  context: __dirname,
  entry: './index.tsx',
  output: {
    path: path.join(__dirname, '../dist')
  },
  resolve: {
    alias: {
      i18n: path.resolve(__dirname, './locales/gen.ts'),
    }
  },
  plugins: [
    new HtmlWebpackPlugin()
  ],
  externals: []
})
