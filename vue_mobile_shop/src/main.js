import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//1.解决300ms延迟的bug
import FastClick from 'fastclick'
/**
 * - 为什么会存在300ms的延迟？
 *   由于移动端存在双击事件，这个双击事件判断的依据就是在300ms之内是否有二次点击的操作。所以会存在延迟
 * - FastClick原理：
 *   移动端事件触发顺序：在移动端，手指点击一个元素，会经过：touchstart --> touchmove -> touchend -->click。
 *   FastClick的实现原理是在检测到touchend事件的时候，会通过DOM自定义事件立即出发模拟一个click事件，并把浏览器在300ms之后真正的click事件阻止掉。
 * - 知识点解析：
 *   a. if( key in obj) 即判断某个属性中是否含有某个key
 *   b. 为某个dom元素增加监听事件：obj.addEventListener('事件名（不用加on）', callback, 是否监听捕获阶段);
*/
if ('addEventListener' in document){
  document.addEventListener('DOMContentLoaded',function (){
    FastClick.attach(document.body);
  }, false);
}

//2.引入公共样式
import '@/style/common.less'

//3.引入vant
import '@/plugins/vant.js'

//4.引入rem
import '@/config/rem.js'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
