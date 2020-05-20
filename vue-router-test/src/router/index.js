import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Film from '@/views/Film'
import Cinema from '@/views/Cinema'
import Center from '@/views/Center'
import Comingsoon from '@/views/Film/Comingsoon'
import Nowplaying from '@/views/Film/Nowplaying'
import Detail from '@/views/Detail'
import Login from '@/views/Login'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history', // 该值默认为hash，即在请求链接中会带有#，
  // 而mode: 'history'中会去掉链接中的#，但是在常规项目中请求地址会报错，需要后端小伙伴相应配置才能正常使用
  routes: [
    {
      path: '/film',
      component: Film,
      children: [
        // 注：子路径书写有两种方式，
        // 方式1：加上全部路径即/film/nowplaying
        // 方式2：子书写子路径，不带/（注：加/表示处在根目录），即nowplaying
        {
          path: '/film/comingsoon',
          component: Comingsoon
        },
        {
          path: '/film/nowplaying',
          component: Nowplaying
        },
        {
          path: '', // 敲回车会重定向到/film/nowplaying这个目录下
          redirect: '/film/nowplaying'
        }
      ]
    },
    {
      path: '/cinema',
      component: Cinema
    },
    {
      path: '/center',
      component: Center
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/detail/:id', // /:这个属于动态路由，即后面的变量是不确定的、随时变化的
      name: 'mydetail',
      component: Detail
    },
    {
      path: '*',
      redirect: '/film' // 如果前面路径都不满足，需重定向到film首页
    }

  ]
})

// const auth = {
//   isLogin: function (){
//     return false;
//   }
// }
// // 全局守卫
// router.beforeEach((to, from, next) => {
//   if (to.path === '/center') {
//     if (auth.isLogin()) { // - 判断是否登录，已登录直接进入当前链接，未登录跳到登录页面
//       next()
//     } else {
//       next('/login')
//     }
//   } else {
//     next()
//   }
// })

export default router
