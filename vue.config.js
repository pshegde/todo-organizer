module.exports = {
  configureWebpack: config => {
    config.entry.app = './client/main.js'

  },
  publicPath: '/',
  devServer: {
    proxy: {
      '/api/*': { target: 'http://localhost:3000', secure: 'false' }
    }
  }
}
