const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: './',
  transpileDependencies: true,
  devServer: {
    open: true,
    proxy: {
      '/api/': {
        target: "http://47.99.156.88:8080",
        // pathRewrite: { '^/api': '' },
        changeOrigin: true,
      },
    }
  },
})
