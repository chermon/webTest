import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import {SHOW_TABBAR_MUTATION} from '@/type' //用什么导入什么

Vue.use(Vuex)

export default new Vuex.Store({
  state: {// - 驱动应用的数据源
    hideBar:true,
    comingSoonData:[],
  },
  getters: {// - 相当于计算后属性
    lestcomingSoon: function (){
      //将comingSoonData中前三条数据取出
      return state.comingSoonData.filter((item,index) => index < 3);
    }
  },
  mutations: {// - 记录谁对哪个状态变量进行了修改
    [SHOW_TABBAR_MUTATION]: function (state, show){
      state.hideBar = show;
    },
    handleHideBar: function (state,hide){
      state.hideBar = hide;
    }
    ,
    handleComingSoon: function(state,data){
      state.comingSoonData = data;
    }
  },
  actions: {
    comingSoonAction: function (store){
      axios({
        url:'https://m.maizuo.com/gateway?cityId=110100&pageNum=1&pageSize=10&type=1&k=895492',
        headers:{
          'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"15898734134870492913889"}',
          'X-Host': 'mall.film-ticket.film.list'
        }
      }).then( response => {
        store.commit('handleComingSoon',response.data.data.films);
      });
    }
  },
  modules: {
  }
})
