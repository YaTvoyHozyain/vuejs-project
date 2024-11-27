const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@use "@/styles/_variables.scss" as *`
      },
      scss: {
        additionalData: `@use "@/styles/_variables.scss" as *;`
      }
    }
  }
})
 