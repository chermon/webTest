/**
 *  该文件nodejs可以识别，并会根据配置将 入口文件 转化为 指定的出口文件
 *  该文件中的语言是nodejs语言
 */
const path = require('path');

module.exports = {
    // - 入口文件
    entry: '.src/main.js',
    // - 输出文件
    output: {
        //指定出口路径__dirname为当前项目的根目录，将入口文件翻译后导入到根目录下的dist文件夹
        path: path.resolve(__dirname,dist),
        //为导出文件命名一个名称
        filename: 'main.js'
    }
}