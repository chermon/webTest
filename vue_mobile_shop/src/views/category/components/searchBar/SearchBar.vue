<template>
    <div class="searchWrapper">
        <div class="searchContent">
            <div class="iconSearchWrapper">
                <svg viewBox="0 0 32 32" class="icon iconSearch">
                    <path fill="#999" fill-rule="evenodd"
                          d="M23.624 21.503c3.47-4.51 3.14-11.003-.992-15.135-4.491-4.49-11.773-4.49-16.264 0-4.49 4.491-4.49 11.773 0 16.264 4.132 4.131 10.625 4.462 15.135.992l4.66 4.66a1.5 1.5 0 1 0 2.121-2.121l-4.66-4.66zm-3.114-.993A8.5 8.5 0 1 0 8.49 8.49a8.5 8.5 0 0 0 12.02 12.02z"></path>
                </svg>
            </div>
            <span class="searchPrompt">输入商品名称</span>
        </div>
    </div>
</template>

<script>


export default {
    
}
</script>

<style lang="less" scoped>
.searchWrapper{
    position: fixed;
    left: 0px;
    top: 0px;
    right: 0px;
    padding: 0.5rem 0.625rem;
    background: #FFF;
    border-bottom: 1px solid #E6E6E6;
}
.searchContent{
    height: 1.75rem;
    padding: 0 0.875rem 0 1.75rem;
    line-height: 1.75rem;
    border-radius: 0.875rem;
    text-align: center;
    font-size: 0.875rem;
    color: #B5B5B5;
    background: #F2F2F2;
    position: relative;
}
.iconSearchWrapper{
    position: absolute;
    left: 0.45rem;
    top: 0.25rem;
    width: 1.25rem;
    height: 1.25rem;
}
.icon {
    fill: #999;
    width: 1rem;
    height: 1rem;
}
.iconSearch{
    width: 100%;
    height: 100%;
}
</style>