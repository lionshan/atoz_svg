const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // devServer: {
  //   proxy: {
  //     "/3dspace/": {
  //       target:'https://plmtest.gen-song.vip',
  //       changeOrigin: true
  //     },
  //     "/3dpassport/": {
  //       target:'https://plmtest.gen-song.vip',
  //       changeOrigin: true
  //     }
  //   }
  // }
})
