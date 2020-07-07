<template>
    <div id="home">
        <!-- 网络请求成功展示数据 -->
       <div v-if="!showLoading">
           <!-- 头部 -->
           <TopHeader></TopHeader>
           <!-- 广告位 -->
           <Sowing :swiperList='swiperList'></Sowing>
           <!-- 导航分类 -->
           <Nav :navData='navList'></Nav>
           <FlashSale :goodsList='flashSalegoods'></FlashSale>
           <!-- 猜你喜欢 -->
           <YouLike :youLikeGoodsList='youLikeGoods'></YouLike>
           <!-- 返回顶部 -->
           <MarkPage v-show='showBackTopBtn' :scrollToTop='scrollToTop'></MarkPage>
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
               showLoading: true,
               //首页轮播图
               swiperList: [],
               //商品分类
               navList: [],
               //限时抢购的商品
               flashSalegoods:[],
               //猜你喜欢的商品
               youLikeGoods:[],
               //展示置顶按钮的状态
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
      
    },
    methods:{
        //置顶
        scrollToTop(){

        },
        /**
         * - 什么是Async/Await?
         *    1) async/await是写异步代码的新方式，以前的方法有回调函数和Promise。
         *    2) async/await是基于Promise实现的，它不能用于普通的回调函数。
         *    3) async/await与Promise一样，是非阻塞的。
         *    4) async/await使得异步代码看起来像同步代码，这正是它的魔力所在。
         * - 为什么Async/Await更好？
         *    1）使用async函数可以让代码简洁很多，不需要像Promise一样需要些then，不需要写匿名函数处理Promise的resolve值，也不需要定义多余的data变量，还避免了嵌套代码。
         *    2）错误处理：Async/Await 让 try/catch 可以同时处理同步和异步错误。在下面的promise示例中，try/catch 不能处理 JSON.parse 的错误，因为它在Promise中。我们需要使用 .catch，这样错误处理代码非常冗余。并且，在我们的实际生产代码会更加复杂。
        */   
        // Promise方法：  
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

        // Async/Await方法：  
        async requestData(){
            //await关键字只能用在aync定义的函数内
            let response = await getHomeData(); // 转为同步执行
            console.log(response.data);
            if(response.success){
                //隐藏加载动画
                this.showLoading = false;
                this.swiperList = response.data.list[0].icon_list;
                this.navList = response.data.list[2].icon_list;
                this.flashSalegoods = response.data.list[3].product_list;
                this.youLikeGoods = response.data.list[12].product_list;

                //监听置顶按钮的状态
                handleBackTopAtion( state => {
                    this.showBackTopBtn = state;
                })
            }
        }
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