<template>
    <div class="swiper-container myswiper">
        <div class="swiper-wrapper">
            <slot></slot>
        </div>
        <!-- 分页器 -->
        <div class="swiper-pagination"></div>
    </div>
</template>
<script>
import Swiper from 'swiper'
import 'swiper/css/swiper.css'
export default {
    props:["myswiper","picnumber"],
    mounted: function (){
        new Swiper('.'+this.myswiper, {
            slidesPerView: this.picnumber,
            spaceBetween: this.picnumber === '3'? 30:20,
        });
    }
}
</script>
<style lang="scss" scoped>
.detailswiper{
    img{
        width: 100%;
    }
}
</style>