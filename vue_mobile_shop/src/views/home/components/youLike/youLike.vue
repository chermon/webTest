<template>
    <div class="youLikeWrapper">
        <div class="youLikeHeader">
            <div class="middleLine"></div>
            <span class="youLikeTitle">猜你喜欢</span>
        </div>
        <div class="youLikeCon">
            <YouLikeItem class="youLikeCell" v-for="goods in youLikeGoodsList" :key="goods.id" :product='goods'></YouLikeItem>
        </div>
    </div>
</template>

<script>
import YouLikeItem from './youLikeItem'

export default {
    props:{
        youLikeGoodsList:Array
    },
    components:{
        YouLikeItem
    }
}
</script>

<style lang="less" scoped>
.youLikeWrapper{
    margin-top: 0.625rem;
    margin-bottom: 4rem;
}
.youLikeHeader{
    padding: 0 0.625rem;
    height: 2.1875rem;
    text-align: center;
    position: relative;
}
.youLikeHeader .middleLine{
    padding-bottom: 0.9375rem;
    border-bottom: 1px solid #D8D8D8;
}
.youLikeHeader .youLikeTitle{
    display: inline-block;
    height: 2.1875rem;
    padding: 0 1.25rem;
    position: absolute;
    top: 0;
    left: 50%;
    line-height: 2.1875rem;
    font-size: 1rem;
    transform: translate(-50%);
    background: #F5F5F5;
}
.youLikeCon{
    overflow: hidden;
}
.youLikeCon .youLikeCell{
    float: left;
}
</style>