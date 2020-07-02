<template>
    <div id="home">
       <!-- <div v-if="showLoading"> -->
           <!-- 头部 -->
           <!-- <TopHeader></TopHeader> -->
           <!-- 广告位 -->
           <!-- <Sowing :swiperList='swiperList'></Sowing>
       </div> -->
       <van-loading type='spinner' size="24px" style="position:absolute;top:40%;left:40%;">加载中...</van-loading>
    </div>
</template>

<script>
import TopHeader from './components/header/TopHeader'
import Sowing from './components/sowing/Sowing'
import {getHomeData} from './../../service/index'

export default {
    name: "Home",
    data(){
        return {
               showLoading:true,
               //首页轮播图
               swiperList:[]
            }
    },
    components:{
        TopHeader,
        Sowing
    },
    created(){
        getHomeData().then( response => {
            if(response.success){
                //隐藏加载动画
                this.showLoading = false;
                this.swiperList = response.data.list[0].icon_list;
            }
        });
    }
}
</script>

<style lang="less" scoped>
#home{
    width: 100%;
    height: 100%;
    // background: grey;
}
</style>