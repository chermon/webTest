<template>
    <div class="cartItemWrapper">
        <a
        href="javascript:;"
        class="cartCheckBox"
        :checked="goods.checked"
        @click.stop="handelSingleChecked(goods.goodsId)"
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
                    <span class="plus" @click="handleSingleAdd">+</span>
                    <input type="text" class="goodsNum" v-model="goods.goodsNum"/>
                    <span class="reduce" @click="handleSingleReduce()">-</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Dialog, Toast } from 'vant';

import { SELECT_CART_SINGLE_GOODS, REMOVE_GOODS_FROM_CART, ADD_GOOD_TO_CART } from '@/store/mutations-type.js'
import { mapState } from 'vuex'
import { getUpdateGoodsNumData, getSingleGoodsSelectedData } from '@/service/index.js'

export default {
    name:"cartItem",
    props:{
        goods: Object
    },
    computed:{
        ...mapState(['shopCart', 'userInfo'])
    },
    methods:{
        // - 处理单个商品被选择的状态
        async handelSingleChecked(goodsId){
            let result = await getSingleGoodsSelectedData(this.userInfo.token, goodsId);
            if(result.success_code === 200){
                this.$store.commit(SELECT_CART_SINGLE_GOODS, {goodsId});
            }
            else{
                Toast({
                    message: '出了点小问题哟~',
                    duration: 500
                });
            }
            
        },

        // - 添加单个商品
        async handleSingleAdd(){
            let result = await getUpdateGoodsNumData(this.userInfo.token, this.goods.goodsId, 'add');
            if(result.success_code === 200){
                this.$store.commit(ADD_GOOD_TO_CART, {
                    goodsId: this.goods.goodsId,
                    goodsName: this.goods.goodsName,
                    goodsPrice: this.goods.goodsId,
                    smallImage: this.goods.smallImage
                });
            }
            else{
                Toast({
                    message: '出了点小问题哟~',
                    duration: 500
                });
            }  
        },

        // - 删除单个商品
        async handleSingleReduce(){
            if(this.goods.goodsNum > 0){
                if(this.goods.goodsNum == 1){
                    Dialog.confirm({
                      title: '温馨提示',
                      message: '确定删除该商品吗?',
                      showCancelButton:true
                    })
                    .then( async () => { // 确定
                        let result = await getUpdateGoodsNumData(this.userInfo.token, this.goods.goodsId, 'reduce');
                        if(result.success_code === 200){
                            this.$store.commit(REMOVE_GOODS_FROM_CART, {goodsId:this.goods.goodsId});
                        }
                        else{
                            Toast({
                                message: '出了点小问题哟~',
                                duration: 500
                            });
                        }
                        
                    })
                    .catch(() => {// 取消
 
                    });
                }
                else{
                    let result = await getUpdateGoodsNumData(this.userInfo.token, this.goods.goodsId, 'reduce');
                    if(result.success_code === 200){
                        this.$store.commit(REMOVE_GOODS_FROM_CART, {goodsId:this.goods.goodsId});
                    }
                    else{
                        Toast({
                            message: '出了点小问题哟~',
                            duration: 500
                        });
                    }
                }
            }
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
.cartCheckBox[checked]{
    background-position: -1.2rem 0;
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