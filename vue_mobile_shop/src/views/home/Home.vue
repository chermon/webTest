<template>
    <div id="home">
       <div v-if="!showLoading">
           <!-- 头部 -->
           <TopHeader></TopHeader>
           <!-- 广告位 -->
           <Sowing :swiperList='swiperList'></Sowing>
           <Nav :navData='navList'></Nav>
           <FlashSale :goodsList='flashSalegoods'></FlashSale>
       </div> 
       <van-loading v-else type='spinner' size="24px" style="position:absolute;top:40%;left:50%;transform:translate(-50%)">加载中...</van-loading>
    </div>
</template>

<script>
import TopHeader from './components/header/TopHeader'
import Sowing from './components/sowing/Sowing'
import Nav from './components/nav/Nav'
import FlashSale from './components/flashSale/FlashSale'
import {getHomeData} from './../../service/index'

export default {
    name: "Home",
    data(){
        return {
               showLoading: true,
               //首页轮播图
               swiperList: [],
               //商品分类
               navList: [],
               //限时抢购的商品
               flashSalegoods:[]
               
            }
    },
    components:{
        TopHeader,
        Sowing,
        Nav,
        FlashSale
    },
    created(){
        getHomeData().then( response => {
            console.log(response.data);
            if(response.success){
                //隐藏加载动画
                this.showLoading = false;
                this.swiperList = response.data.list[0].icon_list;
                this.navList = response.data.list[2].icon_list;
                this.flashSalegoods = response.data.list[3].product_list;
            }
        });
    }
}
</script>

<style lang="less" scoped>
#home{
    width: 100%;
    height: 100%;
    background: #f5f5f5;
}
</style>