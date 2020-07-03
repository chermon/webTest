<template>
    <div class="wrapper">
        <div class="saleHeader">
            <div class="saleTitle">限时抢购</div>
            <span class="saleTime">07:00场</span>
            <div class="saleState">已结束</div>
            <span class="saleMore">更多</span>
        </div>
        <div class="saleBody">
            <GoodsItem class="saleGoods" v-for="item in goodsList" :key="item.id" :goods='item' ></GoodsItem>
        </div>
    </div>
</template>

<script>
import GoodsItem from './GoodsItem'

export default {
    props:{
        goodsList: Array
    },
    components:{
        GoodsItem
    },
    mounted(){
    }
}
</script>

<style lang="less" scoped>
.wrapper{
    position: relative;
    margin-top: 0.625rem;
    padding: 1.25rem 0 0.9375rem 0;
    background: white;
}
.saleHeader{
    margin: 0 0.625rem 0.625rem 0.625rem;
    height: 1.5625rem;
    overflow: hidden;
    // background: red;
}
.saleTitle{
    float: left;
    width: 5.5rem;
    height: 100%;
    line-height: 1.5625rem;
    padding-left: 0.5rem;
    font-size: 1.1875rem;
    font-weight: bold;
    position: relative;
}
.saleTitle::before{
    content: "";
    display: block;
    width: 0.2rem;
    height: 100%;
    background: #75a342;
    position: absolute;
    top: 0;
    left: 0;
}
.saleTime{
    float: left;
    color: rgb(223, 77, 77);
    font-size: 0.875rem;
    line-height: 1.15rem;
}
.saleState{
    float: left;
    margin-left: 0.5rem;
    width: 3.20rem;
    height: 1.15rem;
    line-height: 1.15rem;
    border: 1px solid #999;
    border-radius: 3px;
    text-align: center;
    font-size: 0.875rem;
    color: #666;
}
.saleMore{
    float: right;
    color: #75a342;
    line-height: 1.5625rem;
    font-size: 0.875rem;
}
.saleBody{
    margin: 0 0.625rem 0 0.625rem;
    /**
    * 横向滚动：
    *   外层容器
    *     1.overflow-x: auto; 
    *     2.overflow-y: hidden;
    *     3.white-space: nowrap;
    *   内层
    *     1.内层元素不能浮动
    *     2.必须是行内元素，所以如果是块级元素必须转为行内块即display:inline-block;
    */
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;
    -webkit-overflow-scrolling: touch;//回弹效果
}
//去掉滚动条
.saleBody::-webkit-scrollbar{
    display: none;
}
</style>