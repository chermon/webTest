<template>
    <div id="home">
        <!-- 网络请求成功展示数据 -->
       <div v-if="!showLoading">
           <!-- 头部 （定位、搜索）-->
           <TopHeader></TopHeader>
           <!-- 广告位 -->
           <Sowing :swiperList='swiperList'></Sowing>
           <!-- 导航分类 -->
           <Nav :navData='navList'></Nav>
           <!-- 限时抢购 -->
           <FlashSale :goodsList='flashSalegoods'></FlashSale>
           <!-- 猜你喜欢 -->
           <YouLike :youLikeGoodsList='youLikeGoods'></YouLike>
           <!-- 返回顶部 -->
           <MarkPage v-show='showBackTopBtn'></MarkPage>
       </div>
       <!-- 未得到数据前显示加载框 -->
       <van-loading v-else type='spinner' size="24px" style="position:absolute;top:40%;left:50%;transform:translate(-50%)">加载中...</van-loading>
    </div>
</template>

<script>
// 1. 引入组件
import TopHeader from './components/header/TopHeader'
import Sowing from './components/sowing/Sowing'
import Nav from './components/nav/Nav'
import FlashSale from './components/flashSale/FlashSale'
import YouLike from './components/youLike/youLike'
import MarkPage from './components/markPage/MarkPage'

// 2. 请求首页数据
import {getHomeData} from './../../service/index'

// 3. 引入处理返回顶部的函数
import {handleBackTopAtion} from '@/config/global.js'

export default {
    name: "Home",
    data(){
        return {
               //展示加载中
               showLoading:true,
               //首页轮播图
               swiperList: [],
               //商品分类
               navList: [],
               //限时抢购的商品
               flashSalegoods:[],
               //猜你喜欢的商品
               youLikeGoods:[],
               //展示置顶按钮
               showBackTopBtn:false
            }
    },
    components:{
        //顶部：定位+搜索框
        TopHeader,
        //轮播图
        Sowing,
        //分类导航
        Nav,
        //限时抢购
        FlashSale,
        //猜你喜欢
        YouLike,
        //置顶
        MarkPage
    },
    created(){
        this.requestData();
        // getHomeData().then( response => {
        //     console.log(response.data);
        //     if(response.success){
        //         //隐藏加载动画
        //         this.showLoading = false;
        //         this.swiperList = response.data.list[0].icon_list;
        //         this.navList = response.data.list[2].icon_list;
        //         this.flashSalegoods = response.data.list[3].product_list;
        //         this.youLikeGoods = response.data.list[12].product_list;
        //     }
        // });
    },
    methods:{
        async requestData(){
            let response = await getHomeData(); // 转为同步执行
                console.log(response.data);
                if(response.success){
                    //隐藏加载动画
                    this.showLoading = false;

                    //获取对应的网络数据
                    this.swiperList = response.data.list[0].icon_list;
                    this.navList = response.data.list[2].icon_list;
                    this.flashSalegoods = response.data.list[3].product_list;
                    this.youLikeGoods = response.data.list[12].product_list;

                    //处理置顶函数
                    handleBackTopAtion( state =>{
                        this.showBackTopBtn = state;
                    });

                }
        }
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