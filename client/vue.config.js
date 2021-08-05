module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    proxy: 'http://localhost:5000'
  },
  chainWebpack: config => {
    config.plugin('html')
      .tap(args => {
        args[0].title = 'SL - Tool Console'
        return args
      })
  }
}
