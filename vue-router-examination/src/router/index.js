import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '@/views/HomePage'
import ScorePage from '@/views/ScorePage'
import SubjectPage from '@/views/SubjectPage'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    component: HomePage
  },
  {
    path: '/score',
    component: ScorePage
  },
  {
    path: '/subject',
    component: SubjectPage
  },
  {
    path: '*',
    redirect: '/home'
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});
export default router
