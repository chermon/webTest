<template>
    <div class="cartItemWrapper">
        <!-- 
        @click.stop="singerGoodsSelected(goods.id)" -->
        <a
        href="javascript:;"
        class="cartCheckBox"
        :checked="goods.checked"
        >
        </a>
        <div class="cartImgWrapper">
            <img class="cartImg" :src="goods.smallImage" :alt="goods.goodsName">
        </div>
        <div class="cartDes">
            <a href="#" class="cartGoodsName">{{goods.goodsName}}</a>
            <div class="cartGoods">
                <span class="currentPrice">{{goods.goodsPrice | moneyFormat}}</span>
                <div class="goodsNumWrapper">
                    <span class="plus">+</span>
                    <input type="text" class="goodsNum" v-model="goods.goodsNum"/>
                    <span class="reduce">-</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"cartItem",
    props:{
        goods: Object
    },
    data(){
        return {
            goodsNum:1
        }
    }
}
</script>

<style lang="less" scoped>
.cartItemWrapper{
    width: 100%;
    height: 7rem;
    box-sizing: border-box;
    padding: 0.5rem 0.5rem 0.5rem 2rem;
    background: #fff;
    border-bottom:  0.01rem solid #e0e0e0;
    display: flex;
    align-items: center;
    position: relative;
}
.cartCheckBox{
    display: inline-block;
    width: 1rem;
    height: 1rem;
    background: url('./../../../images/shop-icon.png') no-repeat;
    -webkit-background-size: 2.5rem 5rem;
    background-size: 2.5rem 5rem;
    position: absolute;
    left: 0.5rem;
    top: 1.75rem;
}
.cartImgWrapper{
    height: 6rem;
}
.cartImg{
    display: block;
    height: 6rem;
}
.cartDes{
    flex: 1;
    height: 6rem;
    position: relative;
    margin-left: 0.5rem;
}

.cartDes .cartGoodsName{
    height: 2.2rem;
    line-height: 1.2rem;
    overflow: hidden;
    margin-bottom: 0.3rem;
    font-size: 0.8rem;
    color: #000;
}
.cartDes .cartGoods{
    position: absolute;
    bottom: 0;
    left: 0;
    height: 1.2rem;
    width: 100%;
    display: flex;

}
.currentPrice{
    display: block;
    line-height: 1.2rem;
    width: 50%;
    font-size: 0.8rem;
}
.goodsNumWrapper{
    width: 50%;
    // flex:1;
    height: 1.2rem;
    overflow: hidden;
}
.goodsNumWrapper span{
    float: right;
    width: 1rem;
    height: 1.2rem;
    line-height: 1.2rem;
    text-align: center;
}
.goodsNumWrapper .goodsNum{
    float: right;
    width: 2rem;
    height: 1.2rem;
    text-align: center;
    margin: 0 0.2rem;
    font-size: 0.8rem;
    background: #F5F5F5; 
    border: none;
}
</style>