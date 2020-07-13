<template>
    <div id="cart">
        <header class="cartHeader">
            <h4><strong>购物车</strong></h4>
            <button class="clearCart">清空购物车</button>
        </header>
        <div class="cartContent">
            <CartItem v-for="goods in shopCart" :key="goods.goodsId" :goods='goods'></CartItem>
        </div>
        <footer class="cartFooter">
            <div class="allSelected">
                <a href="javascript:" class="cartCheckBox"></a>
                <span>全选</span>
            </div>
            <div class="allComputed">
                合计：<span class="totalPrice">199.00</span>
            </div>
            <button class="pay">去结算(2)</button>
        </footer>
    </div>
</template>

<script>
import CartItem from './components/cartItem'

import {mapState} from 'vuex';

export default {
    name: "Cart",
    components:{
        CartItem
    },
    computed:{
        ...mapState(['shopCart']),
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