<template>
    <div class="cart">
        <div class="goodsitem" v-for="(item,index) in goodsList" :key='index'>
            {{item.goods}} 
            <div class="goodsnum">
                <i class="cubeic-remove" @click='removeHandle(index)'></i>
                <span>{{item.num}}</span>
                <i class="cubeic-add" @click='addHandle(index)'></i>
            </div>
        </div>
    </div>
</template>
<script>
import {mapState} from 'vuex'

export default {
    data(){
        return {
            // goodsList: [
            //    {
            //       goods: '手机',
            //       num: 1
            //    },
            //    {
            //        goods: '电脑',
            //        num:2
            //    }
            // ]
        };
    },
    methods: {
        // 减少商品
        removeHandle(index){
            this.$store.commit('removeGoodsByCart',index);
        },
        //追加商品
        addHandle(index){
            this.$store.commit('addGoodsByCart',index);
        }
    },
    computed:{
        ...mapState(['goodsList'])
    }
}
</script>

<style lang="scss" scoped>
.cart{
    width: 100%;
    height: 100%;
    .goodsitem{
        padding: 5px;
        height: 20px;
        text-align: left;
        font-size: 14px;
        .goodsnum{
            float: right;
            span{
                margin: 0px 10px;
            }
        }
    }
}
</style>