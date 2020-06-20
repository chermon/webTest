import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userToken: ''
  },
  mutations: {
    //将token保存在状态管理器中
    gainToken(state, token){
      state.userToken = token
    }
  },
  actions: {
    
  },
  modules: {
  }
})
