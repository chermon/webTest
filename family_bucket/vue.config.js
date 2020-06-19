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

        // - 首页轮播图数据接口
        app.get('/api/banner',(req,res)=>{
          res.json({
              data:[  {
                  url: 'https://m.xdclass.net',
                  image: 'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/bannner/1901/learn.png'
                },
                {
                  url: 'https://m.xdclass.net',
                  image: 'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/upload/banner/devpay.png'
                },
                {
                  url: 'https://m.xdclass.net',
                  image: 'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/bannner/1901/bat.png'
                }]
          })
        })

        //滚动分类接口
        app.get('/api/rollinglist',(req,res)=>{
          res.json({
              data:[
                  [
                    {
                        url: 'https://m.xdclass.net',
                        image: 'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/bannner/1901/learn.png',
                        label:'分类一'
                    },
                       {
                        url: 'https://m.xdclass.net',
                        image: 'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/bannner/1901/learn.png',
                        label:'分类一'
                    },
                       {
                        url: 'https://m.xdclass.net',
                        image: 'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/bannner/1901/learn.png',
                        label:'分类一'
                    },
                       {
                        url: 'https://m.xdclass.net',
                        image: 'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/bannner/1901/learn.png',
                        label:'分类一'
                    },
                       {
                        url: 'https://m.xdclass.net',
                        image: 'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/bannner/1901/learn.png',
                        label:'分类一'
                    },
                       {
                        url: 'https://m.xdclass.net',
                        image: 'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/bannner/1901/learn.png',
                        label:'分类一'
                    },
                       {
                        url: 'https://m.xdclass.net',
                        image: 'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/bannner/1901/learn.png',
                        label:'分类一'
                    },
                       {
                        url: 'https://m.xdclass.net',
                        image: 'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/bannner/1901/learn.png',
                        label:'分类一'
                    },
                       {
                        url: 'https://m.xdclass.net',
                        image: 'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/bannner/1901/learn.png',
                        label:'分类一'
                    },
                       {
                        url: 'https://m.xdclass.net',
                        image: 'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/bannner/1901/learn.png',
                        label:'分类一'
                    },
                  ],
                  [
                    {
                        url: 'https://m.xdclass.net',
                        image: 'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/bannner/1901/bat.png',
                        label:'分类一'
                    },
                     {
                        url: 'https://m.xdclass.net',
                        image: 'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/bannner/1901/bat.png',
                        label:'分类一'
                    },
                    {
                        url: 'https://m.xdclass.net',
                        image: 'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/bannner/1901/bat.png',
                        label:'分类一'
                    },
                    {
                        url: 'https://m.xdclass.net',
                        image: 'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/bannner/1901/bat.png',
                        label:'分类一'
                    },
                    {
                        url: 'https://m.xdclass.net',
                        image: 'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/bannner/1901/bat.png',
                        label:'分类一'
                    },
                    {
                        url: 'https://m.xdclass.net',
                        image: 'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/bannner/1901/bat.png',
                        label:'分类一'
                    },
                    {
                        url: 'https://m.xdclass.net',
                        image: 'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/bannner/1901/bat.png',
                        label:'分类一'
                    },
                    {
                        url: 'https://m.xdclass.net',
                        image: 'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/bannner/1901/bat.png',
                        label:'分类一'
                    },
                    {
                        url: 'https://m.xdclass.net',
                        image: 'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/bannner/1901/bat.png',
                        label:'分类一'
                    },
                    {
                        url: 'https://m.xdclass.net',
                        image: 'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/bannner/1901/bat.png',
                        label:'分类一'
                    },
                  ],
              ]
          })
        })

        //获取分类页的分类接口
        app.get('/api/classify',(req,res)=>{
          switch(req.query.type){
              case '0':
              res.json({
                  data:[
                      {
                          image:'//img30.360buyimg.com/focus/s140x140_jfs/t13411/188/926813276/3945/a4f47292/5a1692eeN105a64b4.png',
                          label:'小米'
                      },
                        {
                          image:'//img14.360buyimg.com/focus/s140x140_jfs/t11929/135/2372293765/1396/e103ec31/5a1692e2Nbea6e136.jpg',
                          label:'华为'
                      },
                        {
                          image:'//img10.360buyimg.com/focus/s140x140_jfs/t12178/348/911080073/4732/db0ad9c7/5a1692e2N6df7c609.jpg',
                          label:'荣耀'
                      },
                        {
                          image:'//img20.360buyimg.com/focus/s140x140_jfs/t13759/194/897734755/2493/1305d4c4/5a1692ebN8ae73077.jpg',
                          label:'雪梨手机'
                      },
                      {
                          image:'//img30.360buyimg.com/focus/s140x140_jfs/t13411/188/926813276/3945/a4f47292/5a1692eeN105a64b4.png',
                          label:'小米'
                      },
                        {
                          image:'//img14.360buyimg.com/focus/s140x140_jfs/t11929/135/2372293765/1396/e103ec31/5a1692e2Nbea6e136.jpg',
                          label:'华为'
                      },
                        {
                          image:'//img10.360buyimg.com/focus/s140x140_jfs/t12178/348/911080073/4732/db0ad9c7/5a1692e2N6df7c609.jpg',
                          label:'荣耀'
                      },
                        {
                          image:'//img20.360buyimg.com/focus/s140x140_jfs/t13759/194/897734755/2493/1305d4c4/5a1692ebN8ae73077.jpg',
                          label:'雪梨手机'
                      },
                      {
                          image:'//img30.360buyimg.com/focus/s140x140_jfs/t13411/188/926813276/3945/a4f47292/5a1692eeN105a64b4.png',
                          label:'小米'
                      },
                        {
                          image:'//img14.360buyimg.com/focus/s140x140_jfs/t11929/135/2372293765/1396/e103ec31/5a1692e2Nbea6e136.jpg',
                          label:'华为'
                      },
                        {
                          image:'//img10.360buyimg.com/focus/s140x140_jfs/t12178/348/911080073/4732/db0ad9c7/5a1692e2N6df7c609.jpg',
                          label:'荣耀'
                      },
                        {
                          image:'//img20.360buyimg.com/focus/s140x140_jfs/t13759/194/897734755/2493/1305d4c4/5a1692ebN8ae73077.jpg',
                          label:'雪梨手机'
                      },
                      {
                          image:'//img30.360buyimg.com/focus/s140x140_jfs/t13411/188/926813276/3945/a4f47292/5a1692eeN105a64b4.png',
                          label:'小米'
                      },
                        {
                          image:'//img14.360buyimg.com/focus/s140x140_jfs/t11929/135/2372293765/1396/e103ec31/5a1692e2Nbea6e136.jpg',
                          label:'华为'
                      },
                        {
                          image:'//img10.360buyimg.com/focus/s140x140_jfs/t12178/348/911080073/4732/db0ad9c7/5a1692e2N6df7c609.jpg',
                          label:'荣耀'
                      },
                        {
                          image:'//img20.360buyimg.com/focus/s140x140_jfs/t13759/194/897734755/2493/1305d4c4/5a1692ebN8ae73077.jpg',
                          label:'雪梨手机'
                      },
                      {
                          image:'//img30.360buyimg.com/focus/s140x140_jfs/t13411/188/926813276/3945/a4f47292/5a1692eeN105a64b4.png',
                          label:'小米'
                      },
                        {
                          image:'//img14.360buyimg.com/focus/s140x140_jfs/t11929/135/2372293765/1396/e103ec31/5a1692e2Nbea6e136.jpg',
                          label:'华为'
                      },
                        {
                          image:'//img10.360buyimg.com/focus/s140x140_jfs/t12178/348/911080073/4732/db0ad9c7/5a1692e2N6df7c609.jpg',
                          label:'荣耀'
                      },
                        {
                          image:'//img20.360buyimg.com/focus/s140x140_jfs/t13759/194/897734755/2493/1305d4c4/5a1692ebN8ae73077.jpg',
                          label:'雪梨手机'
                      },
                      
                  ]
              });
              break;
              case '1':
              res.json({
                  data: [
                      {
                          image:'//img30.360buyimg.com/focus/s140x140_jfs/t13411/188/926813276/3945/a4f47292/5a1692eeN105a64b4.png',
                          label:'小米'
                      },
                      {
                          image:'//img30.360buyimg.com/focus/s140x140_jfs/t13411/188/926813276/3945/a4f47292/5a1692eeN105a64b4.png',
                          label:'小米'
                      },
                      {
                          image:'//img30.360buyimg.com/focus/s140x140_jfs/t13411/188/926813276/3945/a4f47292/5a1692eeN105a64b4.png',
                          label:'小米'
                      },
                      {
                          image:'//img30.360buyimg.com/focus/s140x140_jfs/t13411/188/926813276/3945/a4f47292/5a1692eeN105a64b4.png',
                          label:'小米'
                      },
                  ]
              });
              break;
              case '2':
              res.json({
                  data: [
                      {
                          image:'//img14.360buyimg.com/focus/s140x140_jfs/t11929/135/2372293765/1396/e103ec31/5a1692e2Nbea6e136.jpg',
                          label:'华为'
                      },
                      {
                          image:'//img14.360buyimg.com/focus/s140x140_jfs/t11929/135/2372293765/1396/e103ec31/5a1692e2Nbea6e136.jpg',
                          label:'华为'
                      },
                      {
                          image:'//img14.360buyimg.com/focus/s140x140_jfs/t11929/135/2372293765/1396/e103ec31/5a1692e2Nbea6e136.jpg',
                          label:'华为'
                      },
                      {
                          image:'//img14.360buyimg.com/focus/s140x140_jfs/t11929/135/2372293765/1396/e103ec31/5a1692e2Nbea6e136.jpg',
                          label:'华为'
                      }
                  ]
              });
              break;
              case '3':
              res.json({
                  data: [
                      {
                          image:'//img10.360buyimg.com/focus/s140x140_jfs/t12178/348/911080073/4732/db0ad9c7/5a1692e2N6df7c609.jpg',
                          label:'荣耀'
                      },
                      {
                          image:'//img10.360buyimg.com/focus/s140x140_jfs/t12178/348/911080073/4732/db0ad9c7/5a1692e2N6df7c609.jpg',
                          label:'荣耀'
                      },
                      {
                          image:'//img10.360buyimg.com/focus/s140x140_jfs/t12178/348/911080073/4732/db0ad9c7/5a1692e2N6df7c609.jpg',
                          label:'荣耀'
                      },
                      {
                          image:'//img10.360buyimg.com/focus/s140x140_jfs/t12178/348/911080073/4732/db0ad9c7/5a1692e2N6df7c609.jpg',
                          label:'荣耀'
                      },
                  ]
              });
              break;
              case '4':
              res.json({
                  data: [
                      {
                          image:'//img30.360buyimg.com/focus/s140x140_jfs/t13411/188/926813276/3945/a4f47292/5a1692eeN105a64b4.png',
                          label:'小米'
                      },
                      {
                          image:'//img30.360buyimg.com/focus/s140x140_jfs/t13411/188/926813276/3945/a4f47292/5a1692eeN105a64b4.png',
                          label:'小米'
                      },
                      {
                          image:'//img30.360buyimg.com/focus/s140x140_jfs/t13411/188/926813276/3945/a4f47292/5a1692eeN105a64b4.png',
                          label:'小米'
                      },
                      {
                          image:'//img30.360buyimg.com/focus/s140x140_jfs/t13411/188/926813276/3945/a4f47292/5a1692eeN105a64b4.png',
                          label:'小米'
                      },
                  ]
              });
              break;
              case '5':
              res.json({
                  data: [
                      {
                          image:'//img20.360buyimg.com/focus/s140x140_jfs/t13759/194/897734755/2493/1305d4c4/5a1692ebN8ae73077.jpg',
                          label:'雪梨手机'
                      },
                      {
                          image:'//img20.360buyimg.com/focus/s140x140_jfs/t13759/194/897734755/2493/1305d4c4/5a1692ebN8ae73077.jpg',
                          label:'雪梨手机'
                      },
                      {
                          image:'//img20.360buyimg.com/focus/s140x140_jfs/t13759/194/897734755/2493/1305d4c4/5a1692ebN8ae73077.jpg',
                          label:'雪梨手机'
                      },
                      {
                          image:'//img20.360buyimg.com/focus/s140x140_jfs/t13759/194/897734755/2493/1305d4c4/5a1692ebN8ae73077.jpg',
                          label:'雪梨手机'
                      },
                  ]
              });
              break;
              case '6':
              res.json({
                  data: [
                      {
                          image:'//img30.360buyimg.com/focus/s140x140_jfs/t13411/188/926813276/3945/a4f47292/5a1692eeN105a64b4.png',
                          label:'小米'
                      },
                      {
                          image:'//img30.360buyimg.com/focus/s140x140_jfs/t13411/188/926813276/3945/a4f47292/5a1692eeN105a64b4.png',
                          label:'小米'
                      },
                      {
                          image:'//img30.360buyimg.com/focus/s140x140_jfs/t13411/188/926813276/3945/a4f47292/5a1692eeN105a64b4.png',
                          label:'小米'
                      },
                      {
                          image:'//img30.360buyimg.com/focus/s140x140_jfs/t13411/188/926813276/3945/a4f47292/5a1692eeN105a64b4.png',
                          label:'小米'
                      },
                  ]
              });
              break;
          }
        })
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
