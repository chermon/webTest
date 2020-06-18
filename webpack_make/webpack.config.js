//首先引入插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
//默认process.env没有NODE_ENV这个变量，我们需要在package.json中配置
const isDev = process.env.NODE_ENV === 'development';
const config = require('./public/config')[isDev ? 'dev' : 'build']; //根据不同的环境运行不行的页面内容

module.exports = {
    mode: isDev ? 'development': 'production', //告知webpack使用相应模式的内置优化
    //为webpack-dev-server环境配置其他信息，例如：端口号、浏览器控制台消息、是否压缩等
    devServer: {
        port: '3000', //默认端口号是8080
        quiet: false, //默认不开启，启用 quiet 后，除了初始启动信息之外的任何内容都不会被打印到控制台，报错错误信息也不会被打印，所以通常都是不启用
        inline: true, //默认开启 inline 模式，如果设置为false,开启 iframe 模式
        stats: "errors-only", //终端仅打印 error，注意当启用了 quiet 或者是 noInfo 时，此属性不起作用
        overlay: false, //默认不启用，启用 overlay 后，当编译出错时，会在浏览器窗口全屏输出错误。
        clientLogLevel: "silent", //日志等级
        compress: true //是否启用 gzip 压缩
    },
    //定位错误信息
    devtool: 'cheap-module-eval-source-map', //开发环境下使用 
    module: {
        rules: [
            // 将js文件打包成浏览器识别的低版本的js文件
            {
                test: /\.jsx?$/, // 凡是以.jsx结尾的文件
                /**
                 * use的几种写法：
                 * use对应的值可以是字符串 eg: use: 'babel-loader',
                 * use对应的值也可以是数组 eg: use: ['babel-loader']
                 * 如果需要对loader进行配置，use也可以是对象
                */
                use: {
                    loader: 'babel-loader',// 都用babel-loader加载器加载过滤
                    options: {
                        presets: ["@babel/preset-env"],
                        plugins: [
                            [
                                "@babel/plugin-transform-runtime",
                                {
                                    "corejs": 3
                                }
                            ]
                        ]
                    }
                }, 
                exclude: /node_modules/ // 排除node_modules目录，以提高编译效率
            },
            // 将scss文件打包成css文件
            {
                test: /\.(sc|c)ss$/,
                use: ['style-loader', 'css-loader', {
                    loader: 'postcss-loader',
                    options: {
                        plugins: function (){
                            return [
                                require('autoprefixer')({
                                    "overrideBrowserslist": [
                                    ">0.25%",
                                    "not dead"
                                    ]
                                })
                            ]
                        }
                    }
                }, 'sass-loader'],
                exclude: /node_modules/
            },
            // 加载本地图片
            {
                test: /\.(png|jpg|gif|jpeg|webp|svg|eot|ttf|woff|woff2)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            //资源转换为base64可以减少网络请求次数，但是base64数据较大，如果太多的资源时base64，会导致加载变慢，因此设置limit时需两者兼得
                            limit: 10240,//资源大小小于10k时，将资源装换成base64,超过10k,将图片拷贝到dist目录
                            esModule: false, //esModule 设置为 false，否则，<img src={require('XXX.jpg')} /> 会出现 <img src=[Module Object] />
                            name: '[name]_[hash:6].[ext]',
                            outputPath: 'assets'
                        }
                    }
                ]
            },
            {
                test: /.html$/,
                use: 'html-withimg-loader'
            }
        ]
    },
    //数组 放着所有的webpack插件
    plugins: [
        //将html文件导出
        new HtmlWebpackPlugin( // 打包html文件
            {
                template: './public/index.html',
                filename: 'index.html', //打包后的文件名
                minify: {
                    removeAttributeQuotes: false, //是否删除属性的双引号
                    collapseWhitespace: false, //是否折叠空白
                },
                config: config.template
                // hash: true //是否加上hash,默认是 false
            }
        )
    ]
    
}