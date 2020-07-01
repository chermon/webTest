<template>
    <div class="wrapper">
        <div class="locationWrapper">
            <svg viewBox="0 0 32 32" class="icon iconLocation">
                <path fill="#81838E" fill-rule="evenodd"
                      d="M14.521 30.445c.817.738 2.142.75 2.958 0 0 0 11.521-9.82 11.521-17.158C29 5.95 23.18 0 16 0S3 5.949 3 13.287c0 7.339 11.521 17.158 11.521 17.158zM16 18a5 5 0 1 0 0-10 5 5 0 0 0 0 10z"></path>
            </svg>
            <span class="address">朝阳大悦城</span>
            <svg viewBox="0 0 32 32" class="icon iconArrow">
                <path fill="#81838E" fill-rule="evenodd"
                      d="M14.724 19.17c.783.784 2.05.788 2.837 0l5.047-5.047c1.173-1.172.776-2.123-.869-2.123H10.545c-1.652 0-2.04.952-.869 2.123l5.048 5.048z"></path>
            </svg>
        </div>
        <div class="searchWrapper">
            <!-- <div class="searchContent">
                <div class="iconSearchWrapper">
                </div>
                <span class="searchPrompt">输入商品名称</span>
            </div> -->
        </div>
    </div>
</template>

<script>
export default {
    name: 'topheader'
}
</script>

<style lang="less" scoped>
.wrapper{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 3.125rem;
    line-height: 3.125rem;
    box-sizing: border-box;
    border-bottom: solid 1px #eeeeee;
    border-top: solid 1px #eeeeee;
    background: green;
}

.locationWrapper{
    width: 40%;
    height: 3.125rem;
    float: left;
    white-space: nowrap; //段落中的文字不换行
    background: hotpink;
}
.iconLocation{
    position: absolute;
    left: 0.3rem;
    top: 1.062rem;
    background: yellowgreen;
}
.locationWrapper .address{
    display: inline-block;
    width: 50%;
    padding-left: 1.7rem;
    font-size: 0.8rem;
    overflow: hidden;
    white-space: nowrap;
    background: rgb(98, 99, 96);

}
.searchWrapper{
    width: 55%;
    height: 3.125rem;
    float: right;
    background: yellow;
}

@media (min-width: 320px) and (max-width: 374px) {
    .searchWrapper{
        width: 55%;
    }
}
@media (min-width: 375px) and (max-width: 413px) {
    .searchWrapper{
        width: 57%;
    }
}
@media (min-width: 414px) {
    .searchWrapper{
        width: 62%;
    }
}

.icon{
    fill: #999;
    width: 1rem;
    height: 1rem;
}
</style>