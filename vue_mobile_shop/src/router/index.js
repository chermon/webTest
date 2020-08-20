import Vue from 'vue'
import VueRouter from 'vue-router'

//一级路由
import BaseBoard from '@/views/baseboard/BaseBoard'
const Login = () => import ('@/views/login/Login');
const Order = () => import ('@/views/order/Order');

//二级路由
const Home = () => import ('@/views/home/Home');
const Category = () => import ('@/views/category/Category');
const Cart = () => import ('@/views/cart/Cart');
const Mine = () => import ('@/views/mine/Mine');

const MyAddress = () => import ('@/views/order/children/MyAddress');

//三级路由
const AddAddress = () => import ('@/views/order/children/children/AddAddress');
const EditAddress = () => import ('@/views/order/children/children/EditAddress');
const UserCenter = () => import ('@/views/mine/children/UserCenter');

Vue.use(VueRouter)

const routes = [
  {path: '/', redirect: '/baseboard'},
  {
    path: '/baseboard', 
    name: 'baseboard', 
    component: BaseBoard,
    children:[
      {path: '/baseboard', redirect: '/baseboard/home'},
      {path: 'home', name: 'home', component: Home, meta:{keepAlive:true}},
      {path: 'category', name: 'category', component: Category, meta:{keepAlive:true}},
      {path: 'cart', name: 'cart', component: Cart},
      {
        path: 'mine', 
        name: 'mine', 
        component: Mine,
        children: [
          {path: 'userCenter', name: 'userCenter', component: UserCenter}, //用户中心
        ]
      }
    ]
  },
  {
    path: '/order', 
    name: 'order', 
    component: Order,
    children:[
      {
        path: 'myAddress',
        name: 'myAddress',
        component: MyAddress,
        children:[
          {path: 'addAddress', name: 'addAddress', component: AddAddress},
          {path: 'editAddress', name: 'editAddress', component: EditAddress}
        ]
      }
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
