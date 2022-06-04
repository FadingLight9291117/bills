const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: "http://47.99.156.88:8080",
        pathRewrite: { '^/api': '' },
        changeOrigin: true,
      },
    }
  },
})
