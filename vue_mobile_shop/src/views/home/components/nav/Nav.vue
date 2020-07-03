<template>
    <div class="navCon">
        <div class="navItem" v-for="item in navData" :key="item.cid">
            <div class="imgCon">
                <img class="iconImg" :src="item.icon_url" :alt="item.name">
            </div>
            <span class="itemTitle">{{item.name}}</span>
        </div>
    </div>
</template>

<script>
export default {
    name:'navCon',
    props:{
        navData:Array
    }
}
</script>
<style lang="less" scoped>
.navCon{
    width: 100%;
    padding-top: 0.9375rem;
    padding-bottom: 0.9375rem;
    background: #FFF;
    overflow: hidden;
}
.navItem{
    width: 20%;
    padding-top: 0.3125rem;
    float: left;
}
.navItem .imgCon{
    padding-bottom: 58.823%;
    height: 0px;
    text-align: center;//行内元素的居中
}
.navItem .iconImg{
    display: inline-block;
    width: 58.823%;
}
.navItem .itemTitle{
    display: block;
    width: 100%;
    height: 2rem;
    line-height: 2rem;
    font-size: 0.7rem;
    color: #555555;
    text-align: center;
    white-space: nowrap;//不换行
    text-overflow: ellipsis;

}
</style>