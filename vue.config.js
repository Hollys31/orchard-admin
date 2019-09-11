module.exports = {
    publicPath: './',
    productionSourceMap: false,
    lintOnSave: false,
    devServer: {
        //port: 8080,
        https: false,
        hotOnly: false,
        disableHostCheck: true,
        proxy: {
            '/api': {
                target: 'http://192.168.2.41:8089',
                changeOrigin: true
            }
        }
    }
}