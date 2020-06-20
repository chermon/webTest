module.exports = {
  configureWebpack:{
    //webpack-dev-server 相关配置
    devServer:{
      port: 8089, //端口号
      open: true, //运行后自动打开网页
      //MOCK接口编写的地方
      before(app){
        let userpoor = [
          {username:'xiaoming', password: '123456'},
          {username: 'tim', password: '123456'}
        ];

        //注册接口
        app.get('/api/register', (request,response) => {
          const {username, password} = request.query;
          const userlength = userpoor.filter(v => v.username == username).length;
          if(userlength > 0){
            response.json({
              success: false,
              message: '用户名已存在'
            });
          }
          else{
            response.json({
              success: true,
              message: '注册成功'
            });
          }
        });

        // - 登录接口
        let tokenkey='xdclass';
        app.get('/api/login', (request, response) => {
          const {username, password} = request.query;
          const existValue = userpoor.filter(v => v.username == username && v.password == password).length;
          if (existValue > 0){
            console.log("我成功了~");
            response.json({
              code: 0,
              message: '登录成功',
              token: tokenkey + password + (new Date().getTime() * 60 * 60 * 1000)
            });
          }
          else{
            response.json({
              code: 1,
              message: '账号或者密码错误'
            });
          }
        });

        // -

      }
    }
  },
  css: {
    // css预设器配置项
    loaderOptions: {
      stylus: {
        'resolve url': true,
        import: [
          './src/theme'
        ]
      }
    }
  },
  //存放所有的第三方插件配置
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  }
}
