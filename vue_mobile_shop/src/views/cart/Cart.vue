<template>
    <div id="cart" v-if="userInfo.token">
        <header class="cartHeader">
            <h4><strong>购物车</strong></h4>
            <button class="clearCart" @click="handleCleanCart">清空购物车</button>
        </header>
        <div class="cartContent">
            <CartItem v-for="goods in shopCart" :key="goods.goodsId" :goods='goods'></CartItem>
        </div>
        <footer class="cartFooter">
            <div class="allSelected">
                <a href="javascript:" class="cartCheckBox" :checked='isAllSelected' @click.stop="handleAllSelected(isAllSelected)"></a>
                <span>全选</span>
            </div>
            <div class="allComputed">
                合计：<span class="totalPrice">{{totalPrice | moneyFormat}}</span>
            </div>
            <button class="pay" @click="handleGoPlay">去结算({{varietyNum}})</button>
        </footer>
    </div>
    <SelectLogin v-else></SelectLogin>
</template>

<script>
// 1. 引入组件
import CartItem from './components/cartItem'
import SelectLogin from './../login/SelectLogin'

// 2. 引入vuex
import { mapState } from 'vuex';
import { SELECT_CART_ALL_GOODS, CLEAR_SHOP_CART } from '@/store/mutations-type.js'

// 3. 引入组件
// 3.1 弹出框
import { Dialog, Toast } from 'vant';

import {getDeleteCartData, getAllGoodsSelectedData} from '@/service/index.js'

export default {
    name: "Cart",
    components:{
        CartItem,
        SelectLogin
    },
    computed:{
        ...mapState(['shopCart', 'userInfo']),
        // - 根据每个商品的状态判断是否全选
        isAllSelected(){
            let selectedState = false;
            let cartList = Object.values(this.shopCart);
            if(cartList.length > 0){
                let selectedNum = 0;
                cartList.forEach((item, index) => {
                    if (item.checked){
                        selectedNum++;
                    }
                });
                selectedState = selectedNum == cartList.length ? true: false;
            }
            return selectedState;
        },

        // - 总价
        totalPrice(){
            let goodsPrice = 0;
            let cartList = Object.values(this.shopCart);
            if(cartList.length > 0){
                cartList.forEach( (goods, index) => {
                    if(goods.checked){
                        goodsPrice += goods.goodsPrice*goods.goodsNum;
                    }
                    
                });
            }

            return goodsPrice;
        },

        // - 品种数量
        varietyNum(){
            let num = 0;
            let cartList = Object.values(this.shopCart);
            if(cartList.length > 0){
                cartList.forEach( (goods, index) => {
                    if(goods.checked){
                        num++;
                    }
                });
            }
            return num;
        }
    },
    methods:{
        // - 商品是否全选
        async handleAllSelected(currentSeleted){
            let result = await getAllGoodsSelectedData(this.userInfo.token, currentSeleted);
            if(result.success_code === 200){
                this.$store.commit(SELECT_CART_ALL_GOODS, {isAllSelected:!currentSeleted});
            }
            else{
                Toast({
                    message: '出了点小问题哟~',
                    duration: 500
                });
            }
            
        },

        // - 清空购物车
        handleCleanCart(){
            Dialog.confirm({
              title: '温馨提示',
              message: '确定清空所有商品吗?',
            })
            .then(async () => {
                let result = await getDeleteCartData(this.userInfo.token);
                if(result.success_code === 200){
                    this.$store.commit(CLEAR_SHOP_CART);
                }
                else{
                    Toast({
                        message: '出了点小问题哟~',
                        duration: 500
                    });
                }
                
            })
            .catch(() => {
                // on cancel
            }); 
        },

        // - 去结算
        handleGoPlay(){
            if(this.totalPrice > 0){
                this.$router.push('/order');
            }
            else{
                Toast({
                    message: '未有结算商品~',
                    duration: 500
                });
            }
            
        }
    },
    mounted(){
        console.log('购物车：' + this.userInfo);
    }
}
</script>

<style lang="less" scoped>
#cart{
    height: 100%;
    background-color: #f5f5f5;
}
.cartHeader{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 2.6rem;
    -webkit-background-size: 0.1rem 4.4rem;
    background-size: 0.1rem 4.4rem;
    z-index: 999;
    background: #fff;
    line-height: 2.6rem;
    text-align: center;
}
.clearCart{
    position: absolute;
    top: 0;
    right: 0.3rem;
    background-color: transparent;
    color: red;
    font-size: 0.8rem;
    border: none;
}
.cartContent{
    position: relative;
    top: 2.6rem;
    left: 0;
    padding-bottom: 5.6rem;
}
.cartCheckBox{
    display: inline-block;
    width: 1rem;
    height: 1rem;
    background: url('./../../images/shop-icon.png') no-repeat;
    -webkit-background-size: 2.5rem 5rem;
    background-size: 2.5rem 5rem;
}
.cartCheckBox[checked]{
    background-position: -1.2rem 0;;
}
.cartFooter{
    position: fixed;
    left:0;
    bottom:2.7rem;
    width: 100%;
    height: 2.5rem;
    padding: 0 0.5rem;
    box-sizing: border-box;
    background-color: #fff;

    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 0.01rem solid #e0e0e0;
}
.cartFooter .totalPrice{
    color: #E9232C;
}
.cartFooter .pay{
    height: 2rem;
    padding: 0 0.5rem;
    border-radius: 1rem;
    background-color: #E9232C;
    color: #fff;
    border: none;
}
</style>