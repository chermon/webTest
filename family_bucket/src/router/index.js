import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Regist from '@/views/Regist.vue'
import Home from '@/views/Home.vue'
import Schoolroom from '@/views/homes/SchoolRoom.vue'
import Cart from '@/views/homes/Cart.vue'
import Sort from '@/views/homes/Sort.vue'
import My from '@/views/homes/My.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/regist',
    name: 'Regist',
    component: Regist
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import('@/views/Regist.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    children: [
      {
        path: 'schoolroom',
        component: Schoolroom
      },
      {
        path: 'cart',
        component: Cart
      },
      {
        path: 'sort',
        component: Sort
      },
      {
        path: 'my',
        component: My
      },
      {
        path: '/home/',
        redirect:'/home/schoolroom'
      }
    ]
  },
  {
    path: '/',
    redirect: '/login'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
