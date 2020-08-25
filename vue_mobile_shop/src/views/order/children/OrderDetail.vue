<template>
  <div id='orderDtl'>
      <van-nav-bar
        title="商品清单"
        left-arrow
        @click-left="onClickLeft"
      />
      <van-cell-group style='margin-top:0.5rem;'>
        <van-cell title="商品" :value="`共${goodsList.length}件`" />
        <van-card v-for='goods in goodsList'
          :key='goods.goods_id'
          :num="goods.num"
          :price="goods.goods_price"
          :title="goods.goods_name"
          :thumb="goods.small_image"
        />
      </van-cell-group>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { Toast } from 'vant';
import { getSearchAllSelectedGoodsData } from '@/service/index';
export default {
    data() {
      return {
        goodsList:[]
      };
    },
    computed:{
        ...mapState(['userInfo'])
    },
    methods:{
        // 1. 返回上一级
        onClickLeft(){
            this.$router.back();
        },
        // 2. 获取被选中的商品
        async gainSelectedGoods(){
            if(this.userInfo.token){
                let result = await getSearchAllSelectedGoodsData(this.userInfo.token);
                if(result.success_code === 200){
                  this.goodsList = result.data;
                }
            }
            else{
                Toast({
                    message: '登录已过期，请重新登录',
                    duration: 500
                });
            }
          
        },
    },
    mounted(){
        this.gainSelectedGoods();
    }

}
</script>
<style lang="less" scoped>
#orderDtl{
    position: absolute;
    top:0;
    left:0;
    bottom:0;
    right: 0;
    background-color: #f5f5f5;
    z-index: 100;
}
.van-card__price{
    color:#ee0a24;
}
</style>