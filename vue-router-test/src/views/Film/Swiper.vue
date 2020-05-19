import Swiper from 'swiper'
<template>
    <div class="swiper-container filmswiper">
        <div class="swiper-wrapper">
            <slot></slot>
        </div>
        <!-- 分页器 -->
        <div class="swiper-pagination"></div>
        <!-- 导航按钮 -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
</template>
<script>
export default {
    mounted: function(){
        new Swiper(".filmswiper",{
            loop: true,
            //分页器
            pagination: {
                el:'.swiper-pagination'
            },
            //前进后退按钮
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            }
        })
    }
}
</script>
<style lang="scss" scoped>
.swiper-container{
    width: 100%;
}
</style>