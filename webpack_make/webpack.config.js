//首先引入插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
//默认process.env没有NODE_ENV这个变量，我们需要在package.json中配置
const isDev = process.env.NODE_ENV === 'development';
//根据不同的环境运行不行的页面内容
const config = require('./public/config')[isDev ? 'dev' : 'build']; 
//清除服务器缓存
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
//拷贝某个文件夹及其下的内容
const CopyWebpackPlugin = require('copy-webpack-plugin');
//全局引入某个类库
const webpack = require('webpack');
//抽离css
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: isDev ? 'development': 'production', //告知webpack使用相应模式的内置优化
    entry: './src/index.js', //入口文件
    output: {//出口路径
        path: path.resolve(__dirname, 'dist'), // 绝对路径
        //由于服务器缓存，所以我们需要给文件名加上hash,但是也不能每打包一次dist目录就多一个文件，
        //所以我们要通过clean-webpack-plugin清除缓存
        // filename: 'bundle.js', // 出口文件名
        filename: 'bundle.[hash:6].js',
        publicPath: '/'
    },
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
    devtool: 'cheap-module-eval-source-map', //开发环境下使用
    module: {
        rules: [
            //将es6规范通过babel-loader加载器，转换为浏览器识别的js语言规范
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
            //将.scss文件通过加载器转换为css样式
            {
                test: /\.(sc|c)ss$/,
                use: [
                //  'style-loader',
                MiniCssExtractPlugin.loader, // 替换之前的style-loader，用于抽离css
                 'css-loader', {
                    loader: 'postcss-loader',
                    options: {
                        plugins: function (){
                            return [
                                // require('autoprefixer')({
                                //     "overrideBrowserslist": [
                                //     ">0.25%",
                                //     "not dead"
                                //     ]
                                // })
                                require('autoprefixer')()
                            ]
                        }
                    }
                }, 'sass-loader'],
                exclude: /node_modules/
            },
            //加载内嵌图片
            {
                test: /\.(png|jpg|gif|jpeg|webp|svg|eot|ttf|woff|woff2)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240,
                            esModule: false,
                            name: '[name]_[hash:6].[ext]',
                            outputPath: 'assets'
                        }
                    }
                ],
                exclude: /node_modules/
            },
            //加载内嵌图片
            {
                test: /.html$/,
                use: 'html-withimg-loader'
            }
        ]
    },
    //数组 放着所有的第三方插件配置
    plugins: [
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
        ),
        //不需要传参数，它就可以找到 outputPath
        new CleanWebpackPlugin({
            //不删除dll目录及dll目录下的文件或者子目录
            cleanOnceBeforeBuildPatterns:['**/*','!dll','!dll/**']
        }),
        //拷贝某个目录或者目录下的文件到dist目录下
        new CopyWebpackPlugin({
            patterns: [{
                  from: 'public/js/*.js',// 拷贝哪些内容
                  to: path.resolve(__dirname, 'dist', 'js'), // 将这些内容拷贝到dist->js目录下
                  flatten: true,  //flatten: true 表示只会拷贝文件，不会拷贝路径。 为false表示即拷贝路径又拷贝文件
                  globOptions: {
                      ignore: ['other.js'] //不拷贝哪些文件
                  }
              } 
            ]
        }),
        /**
         * 作用：全局引入一些类库
         * 另外如果项目启动使用了eslint的话，则需要修改下eslint的配置文件，增加以下配置：
         *  {
         *    "globals": {
         *       "React": true,
         *       "Vue": true,
         *        .....
         *    }
         *  }
         * */
        new webpack.ProvidePlugin({
            $: 'jquery' //使用的时候就不用import了，而是直接使用$
        }),
        new MiniCssExtractPlugin({
            filename:'css/[name].css'
        })


    ]
}