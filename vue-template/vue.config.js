module.exports = {
  baseUrl: '/', // 网址url的基地址
  outputDir: process.env.NODE_ENV === 'production' ? './pro' : './dev', // 打包路径
  assetsDir: 'static', // 资源目录
  indexPath: 'index.html',
  filenameHashing: true, // 控制缓存
  productionSourceMap: false, // 是否为生产环境构建生成 source map
  css: {
    //modules: true, // css module, css module会导致vant组件样式加载失败
    extract: true, // 是否使用css分离插件 ExtractTextPlugin，采用独立样式文件载入，不采用<style>方式内联至html文件中
    sourceMap: false, // 是否在构建样式地图，false将提高构建速度
  },
  devServer: {
    // devServer
    open: true,
    https: false,
    // 开启代理案例，选用
    /* proxy: {
      '/apiys': {
        // target: 'https://test-sgapi.supor.com/', // target host
        target: 'http://315z14e335.zicp.vip/', // test with zhoucong

        //target: 'http://192.168.30.186:8015', // target host
        // target: 'http://smartapi.free.idcfengye.com',  // target host
        ws: true, // proxy websockets
        changeOrigin: true, // needed for virtual hosted sites
        pathRewrite: {
          '^/apiys': '', // rewrite path
        },
      },
    }, */
  },
  // should learn more, it supposed to be useful
  /* chainWebpack(config) {
    config.plugins.delete('preload') // TODO: need test
    config.plugins.delete('prefetch') // TODO: need test

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      })
      .end()

    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()

    // config
    // // https://webpack.js.org/configuration/devtool/#development
    //   .when(process.env.NODE_ENV === 'development',
    //     config => config.devtool('cheap-source-map')
    //   )

    config.when(process.env.NODE_ENV !== 'development', config => {
      config
        .plugin('ScriptExtHtmlWebpackPlugin')
        .after('html')
        .use('script-ext-html-webpack-plugin', [
          {
            // `runtime` must same as runtimeChunk name. default is `runtime`
            inline: /runtime\..*\.js$/,
          },
        ])
        .end()
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial', // only package third parties that are initially dependent
          },
          elementUI: {
            name: 'chunk-elementUI', // split elementUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/, // in order to adapt to cnpm
          },
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      })
      config.optimization.runtimeChunk('single')
    })
  }, */
}
