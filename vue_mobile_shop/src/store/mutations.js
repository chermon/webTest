import {
    ADD_GOOD_TO_CART
} from './mutations-type'

import {setStore, getStore, removeStore} from '@/config/global'

export default {
    // 添加商品到购物车
    [ADD_GOOD_TO_CART](state, {goodsId, goodsName, goodsPrice, smallImage}){
        console.log("我进入了购物车中");
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
        setStore('shopCart',shopCart);
    }
}