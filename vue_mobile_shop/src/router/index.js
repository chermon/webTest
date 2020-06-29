import Vue from 'vue'
import VueRouter from 'vue-router'

//一级路由
import BaseBoard from '@/views/baseboard/BaseBoard'
const Login = () => import ('@/views/login/Login');

//二级路由
const Home = () => import ('@/views/home/Home');
const Category = () => import ('@/views/category/Category');
const Cart = () => import ('@/views/cart/Cart');
const Mine = () => import ('@/views/mine/Mine');


Vue.use(VueRouter)

const routes = [
  {path: '/', redirect: '/baseboard'},
  {
    path: '/baseboard', 
    name: 'baseboard', 
    component: BaseBoard,
    children:[
      {path: '/baseboard', redirect: '/baseboard/home'},
      {path: 'home', name: 'home', component: Home},
      {path: 'category', name: 'category', component: Category},
      {path: 'cart', name: 'cart', component: Cart},
      {path: 'mine', name: 'mine', component: Mine}
    ]
  },
  {path:'/login', name: 'login', component: Login}
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
