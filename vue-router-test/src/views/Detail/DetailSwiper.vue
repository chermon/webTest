<template>
    <div class="swiper-container qswiper">
        <div class="swiper-wrapper">
            <slot></slot>
        </div>
        <!-- 分页器 -->
        <div class="swiper-pagination qswiper-pagination"></div>
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
            spaceBetween: this.myswiper === 'actorswiper'? 20:10,
            freeMode: true
        });
    }
}
</script>
<style lang="scss" scoped>
.swiper-wrapper{
    img{
        width: 100%;
    }
}
</style>