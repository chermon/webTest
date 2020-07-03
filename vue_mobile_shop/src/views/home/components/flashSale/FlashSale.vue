<template>
    <div class="wrapper">
        <div class="saleHeader">
            <div class="saleTitle">限时抢购</div>
            <span class="saleTime">07:00场</span>
            <div class="saleState">已结束</div>
            <span class="saleMore">更多</span>
        </div>
        <div class="saleBody"></div>
    </div>
</template>

<script>
export default {
    
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
    // background: rebeccapurple;
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
    // height: 1.5625rem;
    line-height: 1.5625rem;
    font-size: 0.875rem;
}
</style>