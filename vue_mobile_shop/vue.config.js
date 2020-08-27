const debug = process.env.NODE_ENV !== 'production'

module.exports = {
    //webpack-dev-serve相关配置
    devServer:{
        port: 8080, //端口号
        open: true, //运行后自动打开网页
        proxy: {
            // '/api': {
            //     target: 'http://demo.itlike.com/web/xlmc',
            //     changeOrigin: true,
            //     pathRewrite: {
            //         '^/api': ''
            //     }
            // },
            '/pay':{
                target: 'http://47.98.157.152/WXPayProject/pay',
                changeOrigin: true,
                pathRewrite: {
                    '^/pay': ''
                }
            }
        }
    },
    configureWebpack: (config) => {
        // console.log("嘻嘻嘻：" + process.env.NODE_ENV);
        if(debug) { // 开发环境配置
            config.devtool = 'cheap-module-eval-source-map'
        } else { // 生产环境配置

        }
    }

}