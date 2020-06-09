module.exports = {
  lintOnSave: false,
  publicPath: '/',
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': []
      },
      sass: {
        data: `
        @import "@/assets/style/_variable.scss";
        @import "@/assets/style/my-mint.scss";
        `
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: false
    }
  }
}
