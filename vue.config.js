const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      "/3dspace/search/common/getProjectTask": {
        target:'https://plmtest.gen-song.vip',
        changeOrigin: true
      }
    }
  }
})
