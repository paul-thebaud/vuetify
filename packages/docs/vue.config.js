const { IS_SERVER } = require('./src/util/globals')

module.exports = {
  css: {
    extract: !IS_SERVER,
    sourceMap: !IS_SERVER,
  },
  configureWebpack: {
    devtool: 'source-map',
  },
  devServer: {
    publicPath: '/',
    disableHostCheck: true,
    historyApiFallback: {
      rewrites: [
        { from: /eo-UY\/.*/, to: '/_crowdin.html' },
        { from: /.*/, to: '/_fallback.html' },
      ],
    },
    serveIndex: true,
    quiet: true,
  },
  pwa: {
    name: 'Vuetify-Docs',
    themeColor: '#094A7F',
    msTileColor: '#5CBBF6',
    manifestOptions: {
      background_color: '#5CBBF6',
    },
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',

    // configure the workbox plugin
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: './src/service-worker.js',
      additionalManifestEntries: [
        { url: '/_fallback.html', revision: Date.now().toString(16) },
      ],
      dontCacheBustURLsMatching: /^\/(js|css).+~[A-Za-z0-9]{8}\.[A-Za-z0-9]{8}\.(js|css)$/,
      // ...other Workbox options...
    },
  },
  transpileDependencies: ['vuetify'],
  lintOnSave: false,
}
