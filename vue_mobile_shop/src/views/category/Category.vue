<template>
    <div id="categoryWrapper">
        <!-- 搜索框 -->
        <SearchBar></SearchBar>
        <!-- 内容 -->
        <div class="contentWrapper" v-if="!showLoading">
            <!-- 侧边栏 -->
            <div class="sidebar">
                <ul>
                    <li class="sidebarLi" 
                        v-for='(item, index) in categaryList'
                        :key='item.id'
                        :class='{selected: selectedIndex === index}'
                        @click='handelCurrentbar(index)'
                    >
                        <span class="textLi">{{item.name}}</span>
                    </li>
                </ul>
            </div>
        </div>
        <!-- 未得到数据前显示加载框 -->
        <van-loading v-else type="spinner" size="24px" style="position:absolute;top:40%;left:50%;transform: translate(-50%);">加载中...</van-loading>
    </div>
</template>

<script>
// 1. 引入组件
import SearchBar from './components/searchBar/SearchBar'

// 2. 请求分类数据
import { getCategaryData, getCategaryDetailData} from '@/service/index.js'

// 3. 引入第三方插件
import BScroll from 'better-scroll'


export default {
    name: "Category",
    data(){
        return {
            //分类列表
            categaryList: [],
            //相应分类下的内容
            cateContent: [],
            //当前分类的索引值
            selectedIndex: 0,
            //展示加载框
            showLoading:true
        }
    },
    components:{
        //搜索框
        SearchBar
    },
    created(){
        //调用网络请求的方法
        this.requestCategaryData();
    },
    methods:{
       // - 1.请求网络数据
       async requestCategaryData(){
           // ①. 获取左边数据
           let response = await getCategaryData();
           if(response.success){
               // ②. 隐藏加载框
               this.showLoading = false;
               //侧边栏
               this.categaryList = response.data.cate;

               // ③. 获取右边数据
               let resDetail = await getCategaryDetailData(`/lk001`);
               console.log(resDetail);
               if(resDetail.success){
                   //对应分类下的内容
                   this.cateContent = resDetail.data.cate;
               }
               // ④. 初始化滚动框架
               this.$nextTick( () => {
                   this.leftScroll = new BScroll('sidebar',{
                       /**
                        * probeType 默认为0
                        * 0：不派发 scroll 事件
                        * 1：会非实时（屏幕滑动超过一定时间后）派发scroll 事件
                        * 2：会在屏幕滑动的过程中实时的派发 scroll 事件
                        * 3：不仅在屏幕滑动的过程中，而且在 momentum 滚动动画运行过程中实时派发 scroll 事件
                        * */
                       probeType: 3, 
                       tap: true, 
                       click: true,
                       scrollY: true, 
                       mouseWheel: true,
                       
                   });
               });

           }
       },
       // - 2. 处理当前选中的栏目
       async handelCurrentbar(index){
           // ①. 改变当前索引
           this.selectedIndex = index;
           // ②. 获取右边数据
            let resDetail = await getCategaryDetailData(`/lk00${index + 1}`);
            if(resDetail.success){
                //对应分类下的内容
                this.cateContent = resDetail.data.cate;
            }

       }
    }
}
</script>

<style scoped>
.categoryWrapper{
    height: 100%;
    width: 100%;
    background-color: #F5F5F5;
    overflow: hidden;
}
.contentWrapper{
    margin-top: 2.75rem;
    margin-bottom: 2.75rem;
}
.sidebar{
    background-color: #F4F4F4;
    width: 5.3125rem;
    
}
.sidebarLi{
    width: 100%;
    padding: 0.75rem 0;
    border-bottom: solid 1px #E8E9E8;
    font-size: 0.8125rem;
    color: #666666;
}

.sidebarLi .textLi{
    line-height: 1.25rem;
    border-left: solid 0.1875rem transparent;
    padding: 0.3125rem 0.6875rem;
}
.sidebarLi.selected{
    background: #FFF;
}
.sidebarLi.selected .textLi{
    border-left-color: #3cb963;
    font-weight: bold;
}
</style>