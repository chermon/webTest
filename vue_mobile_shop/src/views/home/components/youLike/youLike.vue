<template>
    <div class="youLikeWaper">
        <div class="youLikeHeader">
            <div class="middleLine"></div>
            <span class="youLikeTitile">猜你喜欢</span>
        </div>
        <div class="youLikeContent">
            <YouLikeItem v-for="goods in youLikeGoodsList" :key="goods.id" :product="goods"></YouLikeItem>
        </div>
    </div>
</template>

<script>
import YouLikeItem from './YouLikeItem'

export default {
    props:{
        youLikeGoodsList: Array || []
    },
    components:{
        YouLikeItem
    }
}
</script>

<style lang="less" scoped>
.youLikeWaper{
    position: relative;
    margin-top: 0.625rem;
}
.youLikeHeader{
    height: 2.1875rem;
    padding:  0 0.625rem;
    text-align: center;
    font-size: 1rem;
    position: relative;
}
.middleLine{
    width: 100%;
    height: 1px;
    position: absolute;
    left: 0;
    top: 50%;
    background: #D8D8D8;
}
.youLikeTitile{
    height: 2.1875rem;
    line-height: 2.1875rem;
    background: #F5F5F5;
    padding:0 0.75rem;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
}
.youLikeContent{
    overflow: hidden;
}
</style>