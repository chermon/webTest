import {
    INIT_SHOP_CART,
    ADD_GOOD_TO_CART,
    REMOVE_GOODS_FROM_CART,
    SELECT_CART_SINGLE_GOODS,
    SELECT_CART_ALL_GOODS,
    CLEAR_SHOP_CART,
    SAVE_USERINFOR,
} from './mutations-type'


import Vue from 'vue'
import {setStore, getStore, removeStore} from '@/config/global'
// import { delete } from 'vue/types/umd';

export default {
    // 初始化页面，获取购物车中的数据
    [INIT_SHOP_CART](state){
        let cart = getStore('shopCart');
        if(cart){
           //从本地取出
           state.shopCart = JSON.parse(cart);
        }
    },

    // 添加商品到购物车
    [ADD_GOOD_TO_CART](state, {goodsId, goodsName, goodsPrice, smallImage}){
        // 重新复制一份 ’购物车‘ 对象
        let shopCart = state.shopCart;
        // 判断商品是否存在
        if(shopCart[goodsId]){ // 存在
            shopCart[goodsId].goodsNum++;
        }
        else{
            shopCart[goodsId] = {
                goodsId,
                goodsName,
                goodsPrice,
                smallImage,
                goodsNum: 1,
                checked: true
            }
        }
        //产生新的对象
        state.shopCart = {...shopCart};
        //存储到本地
        setStore('shopCart', shopCart);
    },

    // 移除商品
    [REMOVE_GOODS_FROM_CART](state, {goodsId}){
        let cart = state.shopCart;
        let goods = cart[goodsId];
        if(goods){
            if(goods.goodsNum > 1){
                goods.goodsNum--;
            }
            else{
                delete cart[goodsId];
            }
            
            state.shopCart = {...cart};
            setStore('shopCart', cart);
        }
    },

    // 购物车中单个商品选中与取消
    [SELECT_CART_SINGLE_GOODS](state, {goodsId}){
        let cart = state.shopCart;
        let goods = cart[goodsId];
        if(goods){
            if(goods.checked){ // 存在该属性
                goods.checked = !goods.checked;
            }
            else{
                // 为对象增加属性
                Vue.set(goods,'checked',true);
            }
            
            //更新vuex中购物车的数据
            state.shopCart = {...cart};
            //更新本地数据
            setStore('shopCart', cart);
        }
    },

    // 购物车中全部商品选中与取消
    [SELECT_CART_ALL_GOODS](state, {isAllSelected}){
        let cart = state.shopCart;
        let cartList = Object.values(cart);
        // 判断该数组是否有值
         if(cartList.length > 0){
            cartList.forEach((goods, index) => {
                if(goods.checked){ // 存在该属性
                    goods.checked = isAllSelected;
                }
                else{
                    Vue.set(goods, 'checked', isAllSelected);
                }
            });
            state.shopCart = {...cart};
            setStore('shopCart', cart);
         }
    },

    // - 清空购物车
    [CLEAR_SHOP_CART](state){
        state.shopCart = null;
        state.shopCart = {...state.shopCart};
        setStore('shopCart', state.shopCart);
    },

    // - 保存用户信息
    [SAVE_USERINFOR](state, {userInfo}){
        state.userInfo = userInfo;
        setStore('userInfo', state.userInfo);
    },

}