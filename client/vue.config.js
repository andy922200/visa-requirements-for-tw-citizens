const path = require('path')

module.exports = {
  outputDir: path.resolve(__dirname, '../public'),
  devServer: {
    proxy: {
      '/api': {
        target: 'https://visa-requirement-tw.herokuapp.com/'
        //target: 'http://localhost:3000'
      }
    },
  }
}