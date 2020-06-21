import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let store = new Vuex.Store({
  state: {
    userToken: '',
    // JSON.parse 将字符串转为json
    goodsList: JSON.parse(localStorage.getItem('cartarry')) || [],
  },
  mutations: {
    // 将token保存在状态管理器中
    gainToken(state, token){
      state.userToken = token
    },

    // 将商品列表的物品增加到购物车中
    gainGoodsList(state, product){
      let newGoods = state.goodsList.find( v => v.goods == product.label);
      if (newGoods){
        newGoods.num += 1;
      }else{
        state.goodsList.push({goods:product.label, num: 1});
      }
    },

    //在购物车中追加商品
    addGoodsByCart(state, index){
      state.goodsList[index].num += 1;
    },

    //在购物车中移除某件商品
    removeGoodsByCart(state, index){
      if (state.goodsList[index].num > 1){
        state.goodsList[index].num -= 1;
      }
      else{
        if(window.confirm('确定要移除这个商品吗？')){
          state.goodsList.splice(index,1);
        }
      }
    }

  },
  actions: {
    
  },
  modules: {
  }  
})

// 每次调用mutations的时候都会进入该方法， 
// 在此用来更新本地存储的数据
store.subscribe( (mutations,state) => {
  localStorage.setItem('cartarry', JSON.stringify(state.goodsList));
})
export default store;