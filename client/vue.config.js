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
        args[0].title = 'Social Mining Tool User Management'
        return args
      })
  }
}
